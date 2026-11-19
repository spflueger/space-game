# DDR-002: Dice-Based Combat Resolution

- **Status**: Accepted
- **Date**: 2026-11-16
- **Deciders**: space-game team

## Game Mechanic / Balance Problem
How do opposing forces battle when an attacking fleet arrives at an enemy or neutral planet?

## Considered Options
1. **Deterministic Attrition**: Direct 1-to-1 force subtraction.
2. **Classic Risk Dice**: Attackers roll up to 3 dice, defenders roll up to 2 dice, highest pairs compared, ties go to defender.
3. **Simultaneous Lanchester Power Law**: Continuous combat formulas.

## Chosen Mechanic & Justification
**Classic Risk Dice (Option 2) for Milestone 1**.
- **Reasoning**: Familiar, exciting variance, simple to implement deterministically using seeds, and matches the design goal from the project overview.

## Rules Specification
- Attacker rolls `min(3, attackerForces)` 6-sided dice (D6).
- Defender rolls `min(2, defenderForces)` 6-sided dice (D6).
- Sort dice in descending order for both sides.
- Compare highest attacker die vs highest defender die:
  - If attacker die > defender die: defender loses 1 force.
  - If defender die >= attacker die: attacker loses 1 force (defender wins ties).
- If both rolled at least 2 dice, compare second-highest:
  - Same comparison rules applied.
- Repeat rounds of dice rolls until one side reaches 0 forces.
- If attacker has forces remaining and defender has 0, attacker captures the planet with the surviving forces.
