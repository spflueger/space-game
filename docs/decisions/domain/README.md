# Domain Decision Records (DDRs)

Domain Decision Records capture decisions about **game rules, mechanics, economic balance, combat formulas, and simulation parameters**.

Unlike ADRs (which specify *how* code is structured), DDRs specify *what* the game universe does and how gameplay mechanics function.

## Format Template: `DDR-XXX-<title>.md`

```markdown
# DDR-001: Title of Game Design Decision

- **Status**: [Draft | Accepted | Superseded]
- **Date**: YYYY-MM-DD
- **Deciders**: [Game Designer / Product Stakeholder / Agent]

## Game Mechanic / Balance Problem
What rule, mechanic, or balance issue is being decided?

## Considered Options / Formulas
- Option A: ...
- Option B: ...

## Chosen Mechanic & Justification
Details of the chosen formula, table, or algorithm.

## Gameplay Implications
- Impact on player strategy
- Potential edge cases (e.g., ties, zero forces)
```

## Decisions Index
- [DDR-001: Turn Structure and Phase Order](./DDR-001-turn-structure-and-phases.md)
- [DDR-002: Dice-Based Combat Resolution](./DDR-002-dice-combat-resolution.md)
