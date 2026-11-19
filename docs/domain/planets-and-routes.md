# Domain Specification: Planets and Routes

## Planets
A planet represents a controllable territory and economic node.

### Attributes
- `id`: Unique string (e.g., `"p-earth"`, `"p-mars"`).
- `name`: Display name.
- `ownerId`: Player ID controlling the planet, or `null` if neutral/uncolonized.
- `forces`: Current integer count of defensive units garrisoned.
- `productionRate`: Number of new forces generated per turn (if controlled).

## Routes
Routes are interstellar lanes connecting pairs of planets.

### Attributes
- `from`: ID of planet A.
- `to`: ID of planet B.
- `distance`: Positive integer representing transit turns (minimum 1).

### Rules
- Fleets can only move between planets directly connected by a route.
- Routes are bidirectional unless specifically defined otherwise.
