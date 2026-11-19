# DDR-001: Turn Structure and Phase Order

- **Status**: Accepted
- **Date**: 2026-11-16
- **Deciders**: space-game team

## Game Mechanic / Balance Problem
When multiple players submit simultaneous orders in a round, in what order should actions resolve? Specifically, should planetary production happen before or after incoming fleet attacks?

## Considered Options
1. **Production Before Combat**: Defenders produce reinforcements before the battle occurs.
2. **Combat Before Production**: Arriving fleets battle the defenders currently present. The victor (conqueror or surviving defender) receives that turn's production.

## Chosen Mechanic & Justification
**Combat Before Production (Option 2)**.
- **Reasoning**: If a player successfully captures an enemy planet this turn, rewarding the conqueror with that turn's production provides immediate momentum and eliminates awkward edge cases of a captured planet producing units for an owner who just lost it.

## Execution Order
1. Deduct departures & launch fleets into transit.
2. Advance transiting fleets by 1 speed unit.
3. Resolve arrivals & battles on contested planets.
4. Update planet ownership based on battle outcomes.
5. Award production forces to current planet owners.
6. Check victory conditions.
