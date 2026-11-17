# Domain Specification: Fleets and Orders

## Orders
During the planning phase, players can submit orders:

### Order Type: `SEND_FORCES`
- `playerId`: ID of the issuing player.
- `fromPlanetId`: Origin planet owned by the player.
- `toPlanetId`: Destination planet (must be connected by a route).
- `forces`: Number of forces to dispatch.

### Validation Rules
- `fromPlanetId` must be owned by `playerId`.
- There must be an active route between `fromPlanetId` and `toPlanetId`.
- `forces` must be greater than 0 and less than or equal to `planet.forces`.
- If valid, `forces` are deducted from origin immediately upon turn resolution.

## Fleets in Transit
When dispatched, forces travel as an in-transit fleet:
- `id`: Unique fleet ID.
- `ownerId`: Player ID who owns the fleet.
- `from`: Origin planet ID.
- `to`: Destination planet ID.
- `forces`: Current troop count.
- `remainingDistance`: Integer decrementing by 1 each turn.

When `remainingDistance <= 0`, the fleet arrives at destination, triggering reinforcement (if friendly) or combat (if hostile/neutral).
