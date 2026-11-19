---
name: work-on-issue
description: Autonomous workflow to implement a GitHub issue from start to PR. Use when assigned a GitHub issue number or requested to implement an issue.
---

# Skill: Work on Issue

Implements a GitHub issue end-to-end adhering to project rules, testing standards, and architecture decisions.

## Usage
`/skill:work-on-issue <issue-number>`

---

## Workflow Steps

### Phase 1: Ingest & Verify Scope
1. **Fetch Issue**:
   ```bash
   gh issue view <issue-number> --json title,body,labels,assignees
   ```
2. **Review Specifications & Precedence**:
   - Read acceptance criteria in the issue body.
   - Read relevant docs in `/docs/architecture/` and `/docs/decisions/`.
   - Check if `needs:human-review` label or text is present.
3. **Escalation Check**:
   - If the task violates an ADR, alters core architecture boundaries without an ADR, or lacks critical acceptance criteria:
     - **STOP.** Do not start writing code.
     - Post an escalation comment on the issue explaining the contradiction or ambiguity:
       ```bash
       gh issue comment <issue-number> --body "⚠️ **Agent Escalation:** [Explain conflict/ambiguity and what decision is needed]"
       ```
     - Halt and report to the user.

### Phase 2: Setup Branch & Environment
1. Ensure git user identity is configured:
   ```bash
   git config user.name "space-game-agent[bot]"
   git config user.email "agent@users.noreply.github.com"
   ```
2. Switch to `main`, pull latest, and branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/issue-<issue-number>-<short-slug>
   ```

### Phase 3: Implementation & Local Verification
1. **Implement minimal changes**:
   - Focus solely on fulfilling the acceptance criteria.
   - Keep internal decisions clean, idiomatic, and documented.
2. **Write & Update Tests**:
   - Add unit/integration tests directly validating the issue's requirements.
   - Ensure edge cases mentioned in the issue are tested.
3. **Run Checks**:
   - Run the test suite:
     ```bash
     npm test
     ```
   - Run typecheck / lint if configured:
     ```bash
     npm run check 2>/dev/null || npx tsc --noEmit
     ```
   - If any test fails, analyze and fix until 100% green. Do not proceed until tests pass.

### Phase 3.5: Pre-PR Local Self-Review
Before creating a PR, perform an autonomous self-review against project standards:
1. Inspect the full diff against base:
   ```bash
   git diff origin/main...HEAD
   ```
2. Self-review checklist:
   - **Determinism**: Zero calls to `Math.random()` or non-deterministic APIs. All randomness must use seedable PRNGs. State transitions must be pure and immutable.
   - **Architectural Alignment**: Verified against `/docs/architecture/` and ADRs in `/docs/decisions/`.
   - **Strict Types**: No unsafe `any` casts or unhandled null/undefined values.
   - **Test Coverage**: All newly introduced branches, edge cases, and acceptance criteria have corresponding automated tests.
   - **Commit Cleanliness**: Commits follow Angular Conventional Commit conventions.
3. If any gaps or defects are identified, fix them and rerun `npm test` before continuing.

### Phase 4: Commit & Pull Request
1. Commit changes with conventional commits:
   ```bash
   git add -A
   git commit -m "feat(<scope>): <concise description>"
   ```
2. Push branch:
   ```bash
   git push -u origin feature/issue-<issue-number>-<short-slug>
   ```
3. Prepare PR metadata:
   - Determine if human review was requested in the issue (e.g. label `needs:human-review` or flagged in issue body).
   - Format body:
     ```markdown
     Closes #<issue-number>

     ### Summary
     - <bullet points of changes>

     ### Pre-PR Local Self-Review
     - [x] Determinism verified (no Math.random, seedable PRNG, pure state transitions)
     - [x] Architectural compliance with /docs/architecture & ADRs
     - [x] TypeScript strictness & test coverage complete

     ### Verification
     - Unit tests added: `<test files>`
     - Local test run result: `npm test` passing cleanly.

     ### Review Mode
     - [ ] Needs Human Review (checked if issue requested human review)
     - [x] Pre-PR Local Review Completed
     - [x] AI CI Review Ready
     ```
4. Create PR via GitHub CLI:
   ```bash
   gh pr create --title "feat(<scope>): <title>" --body "<body>"
   ```
5. If `needs:human-review` was specified, attach label to PR:
   ```bash
   gh pr edit --add-label "needs:human-review" 2>/dev/null || true
   ```

6. Summarize PR URL and completion status to the user.
