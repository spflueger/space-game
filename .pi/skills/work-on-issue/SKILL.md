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

     ### Verification
     - Unit tests added: `<test files>`
     - Local test run result: `npm test` passing cleanly.

     ### Review Mode
     - [ ] Needs Human Review (checked if issue requested human review)
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
