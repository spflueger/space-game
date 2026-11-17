---
name: resolve-pr-feedback
description: Address review comments and CI failures on an open PR. Use when PR feedback needs to be resolved autonomously.
---

# Skill: Resolve PR Feedback

Inspects PR reviews, bot comments, or CI test failures, applies required code/test corrections, verifies tests pass, and updates the PR.

## Usage
`/skill:resolve-pr-feedback <pr-number>`

---

## Workflow Steps

### Phase 1: Fetch Feedback & State
1. **Checkout PR branch**:
   ```bash
   gh pr checkout <pr-number>
   ```
2. **Retrieve PR comments and review remarks**:
   ```bash
   gh pr view <pr-number> --comments
   ```
3. **Retrieve failing CI checks (if any)**:
   ```bash
   gh pr checks <pr-number>
   ```

### Phase 2: Analyze & Classify Feedback
1. Read each comment/failure and categorize:
   - **Bug / Regression / Missing Test**: Valid technical fix $\to$ plan the fix.
   - **Architectural Scope Change**: Reviewer is asking for an architectural change or scope expansion beyond the original issue:
     - Check `/docs/decisions/` and `/docs/architecture/`.
     - If it conflicts with existing ADRs or blows up scope, post an escalation comment and stop.
   - **Stylistic / Minor Refactor**: Apply clean code adjustment.

### Phase 3: Apply Fixes & Verify
1. Modify source files and update/add corresponding unit tests.
2. Run test verification locally:
   ```bash
   npm test
   ```
   Do not commit until `npm test` passes cleanly.

### Phase 4: Push Update & Reply
1. Commit the fixes:
   ```bash
   git add -A
   git commit -m "fix(pr-<pr-number>): address review feedback"
   ```
2. Push to branch:
   ```bash
   git push
   ```
3. Post a comment on the PR detailing the resolutions:
   ```bash
   gh pr comment <pr-number> --body "### Review Feedback Resolved\n- <bullet points explaining changes and passing tests>"
   ```
