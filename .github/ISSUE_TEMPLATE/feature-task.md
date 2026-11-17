---
name: Feature Task
about: Standard task for autonomous agent execution
title: "[TASK] "
labels: ["agent:ready"]
assignees: ""
---

### 1. Goal / Problem Statement
<!-- Clear, concise description of the feature or fix. -->

### 2. Relevant Specs & Decisions
<!-- Point to the specific relevant arc42 sections, ADRs, or DDRs. -->
- Architecture: `docs/architecture/05-building-blocks.md`, `docs/architecture/06-runtime-view.md`
- Tech Decisions (ADR): `docs/decisions/architecture/ADR-001-deterministic-game-engine.md`
- Game Design Decisions (DDR): `docs/decisions/domain/DDR-001-turn-structure-and-phases.md`
- Domain Specs: `docs/domain/planets-and-routes.md`

### 3. Acceptance Criteria
<!-- Explicit, testable criteria defining 'done'. -->
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Automated tests covering new behavior pass cleanly (`npm test`)
- [ ] TypeScript typecheck passes (`npm run check`)

### 4. Review Mode
<!-- Check one of the following: -->
- [ ] **AI CI Review Only** (Auto-mergeable when CI & AI review pass)
- [ ] **Human Review Required** (Blocks merge until human sign-off)
