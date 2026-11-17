#!/usr/bin/env node
/**
 * scripts/ai-pr-review.mjs
 *
 * Lightweight CI AI reviewer tailored to space-game.
 * Leverages OPENROUTER_API_KEY, ANTHROPIC_API_KEY, or LLM_PROXY_*
 * to perform a cost-effective, architecture-aware PR review.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const prNumber = process.env.PR_NUMBER || process.env.GITHUB_REF?.match(/refs\/pull\/(\d+)\/merge/)?.[1];
const targetBase = process.env.TARGET_BASE || 'origin/main';

// 1. Check for API Credentials
const openRouterKey = process.env.OPENROUTER_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const proxyBaseUrl = process.env.LLM_PROXY_BASE_URL;
const proxyKey = process.env.LLM_PROXY_API_KEY;

if (!openRouterKey && !anthropicKey && !proxyKey && !proxyBaseUrl) {
  console.log('ℹ️  No AI review API key or proxy detected in secrets (OPENROUTER_API_KEY, ANTHROPIC_API_KEY, or LLM_PROXY_*). Skipping AI review.');
  process.exit(0);
}

// 2. Fetch git diff against target base
let gitDiff = '';
try {
  gitDiff = execSync(`git diff ${targetBase}...HEAD`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (err) {
  console.warn('⚠️ Could not generate diff using', `${targetBase}...HEAD`, err.message);
  try {
    gitDiff = execSync('git diff HEAD~1...HEAD', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch {
    console.error('❌ Failed to get git diff for review.');
    process.exit(0);
  }
}

if (!gitDiff.trim()) {
  console.log('ℹ️  No code diff found to review.');
  process.exit(0);
}

// Truncate diff if extremely large to maintain low token cost
const maxChars = 30000;
const truncatedDiff = gitDiff.length > maxChars
  ? gitDiff.slice(0, maxChars) + '\n\n...[diff truncated for length]...'
  : gitDiff;

// 3. Prepare Review Prompt
const systemPrompt = `You are a specialized code reviewer for "space-game", a turn-based multiplayer space strategy game written in TypeScript.
Your focus:
1. Architecture & Domain compliance (check against specs in /docs/ if relevant)
2. Game engine determinism: never allow Math.random() (must use seedable PRNG), ensure state immutability
3. Code quality, strict TypeScript safety, and clean test coverage
4. Angular Conventional Commit & Agent Constitution alignment

Be constructive, concise, and prioritize high-signal feedback. If everything looks good, approve warmly with a short summary.
Structure your review as:
- **Summary**: High-level overview of the pull request.
- **Key Findings**: Points of excellence or potential concerns (bugs, edge cases, determinism violations).
- **Suggestions / Nitpicks**: Minor non-blocking suggestions (if any).
- **Verdict**: [APPROVE], [NEEDS WORK], or [REQUEST CHANGES]
`;

const userContent = `Please review the following git diff:

\`\`\`diff
${truncatedDiff}
\`\`\`
`;

async function callLLM() {
  // Option A: OpenRouter (Default low-cost model: openai/gpt-4o-mini or anthropic/claude-3.5-haiku)
  if (openRouterKey) {
    const model = process.env.REVIEW_MODEL || 'anthropic/claude-3.5-haiku';
    console.log(`📡 Sending diff to OpenRouter (${model})...`);
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openRouterKey}`,
        'HTTP-Referer': 'https://github.com/spflueger/space-game',
        'X-Title': 'space-game-ci-review',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
      }),
    });
    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content;
  }

  // Option B: Direct Anthropic API
  if (anthropicKey) {
    const model = process.env.REVIEW_MODEL || 'claude-3-5-haiku-latest';
    console.log(`📡 Sending diff to Anthropic (${model})...`);
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        system: systemPrompt,
        max_tokens: 2048,
        messages: [{ role: 'user', content: userContent }],
        temperature: 0.2,
      }),
    });
    if (!res.ok) throw new Error(`Anthropic API error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.content?.map((c) => c.text).join('\n');
  }

  // Option C: Custom LLM Proxy
  if (proxyBaseUrl) {
    const url = proxyBaseUrl.replace(/\/$/, '') + '/chat/completions';
    const model = process.env.REVIEW_MODEL || 'eu/claude-sonnet-5.5';
    console.log(`📡 Sending diff to LLM Proxy (${url}, model: ${model})...`);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(proxyKey ? { Authorization: `Bearer ${proxyKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
      }),
    });
    if (!res.ok) throw new Error(`LLM Proxy API error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content;
  }

  throw new Error('No configured LLM provider found.');
}

async function main() {
  try {
    const reviewText = await callLLM();
    if (!reviewText) {
      console.warn('Empty review returned from LLM.');
      process.exit(0);
    }

    console.log('\n--- AI Review Output ---');
    console.log(reviewText);
    console.log('------------------------\n');

    // Post to PR if PR_NUMBER or GH_TOKEN is present
    if (prNumber) {
      const commentBody = `### 🤖 AI Code Review\n\n${reviewText}\n\n*Review generated autonomously via space-game CI pipeline.*`;
      try {
        console.log(`Posting review comment to PR #${prNumber}...`);
        execSync(`gh pr comment ${prNumber} --body "${commentBody.replace(/"/g, '\\"')}"`, {
          stdio: 'inherit',
        });
        console.log('✅ Review comment posted successfully.');
      } catch (err) {
        console.warn('⚠️ Could not post comment via gh CLI:', err.message);
      }
    } else {
      console.log('ℹ️ No PR number detected. Printed review to CI logs.');
    }
  } catch (err) {
    console.error('❌ AI Review error:', err.message);
    // Don't fail the build pipeline strictly on AI review failure
    process.exit(0);
  }
}

main();
