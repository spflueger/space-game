# Space Game Agent Constitution

## 1. Prime Directives
1. **Never commit directly to `main`**: All work happens in isolated feature branches.
2. **Never open a PR or mark work complete without passing automated checks**: Code must be accompanied by tests, and the project test suite (`npm test`) must pass cleanly.
3. **Strict Scope Discipline**: Work strictly within the boundaries of the assigned issue. Do not perform unrelated refactoring, rewrite unrelated subsystems, or add unasked-for features.
4. **Security & Credential Boundaries**: Never log, commit, or expose API keys, tokens, or credentials. Never alter `.github/workflows/`, container definitions, or credential configs unless the issue explicitly commands it.

## 2. Authority & Decision Boundaries
- **Autonomous Decisions (Allowed without human input)**:
  - Internal algorithm and data-structure choices inside scoped modules.
  - Adding helper functions, unit tests, and internal types.
  - Resolving non-breaking edge cases aligned with existing specs and ADRs.
- **Mandatory Escalation (Stop and request human input)**:
  - **Scope Creep / Architectural Drift**: The ticket unexpectedly requires modifying a core architectural boundary or public API defined in an ADR.
  - **Specification Conflicts**: Acceptance criteria contradict an existing ADR or architecture document.
  - **Ambiguity with Divergent Trade-offs**: Missing requirements where two or more distinct, valid designs exist with significantly different consequences.
  - **Upstream Breakage**: Unresolvable test/build failures in code outside the issue scope.

## 3. Precedence Hierarchy
When guidelines or documents appear to conflict:
1. **Security rules & explicit task acceptance criteria**
2. **Architecture Decisions (`/docs/decisions/architecture/ADR-*.md`)**
3. **Domain & Game Design Decisions (`/docs/decisions/domain/DDR-*.md`)**
4. **Architecture specs (`/docs/architecture/*.md`) and Domain specs (`/docs/domain/*.md`)**
5. **Existing automated tests and code**
6. **Agent inference / general defaults**

*If a conflict arises between levels 1–4, document the conflict and escalate to a human. Never guess.*

## 4. Commit Message Conventions
All commit messages must strictly adhere to the Angular Conventional Commits format:
```
<type>(<scope>): <summary>

[optional body]

[optional footer(s)]
```

### Allowed Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Formatting, missing semicolons, etc. (no logic change)
- `refactor`: Refactoring production code without changing behavior
- `perf`: Code change that improves performance
- `test`: Adding or correcting tests
- `build`: Changes to build system or external dependencies
- `ci`: Changes to CI configuration and automation scripts
- `chore`: Maintenance tasks, dev environment, tooling
- `revert`: Reverts a previous commit
- `devai`: Changes to AI agent instructions (`AGENTS.md`), prompts, skills, or AI developer configuration (`.pi/*`)

### Rules:
- Scope is optional (e.g. `feat(core):`, `devai(skills):`, `chore(env):`).
- Summary in lowercase, imperative mood, without trailing period.
- Header length should not exceed 100 characters (recommended $\le 72$).
- Verified locally via Git `commit-msg` hook (`.githooks/commit-msg`).

## 5. Skills Reference
Detailed step-by-step procedures are implemented as Pi Skills:
- `/skill:work-on-issue <id>`: Pick up an autonomous issue, build it, test it, and open a PR.
- `/skill:resolve-pr-feedback <pr-id>`: Address CI AI review feedback or human review comments on an open PR.
