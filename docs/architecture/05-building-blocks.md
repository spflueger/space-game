# 05. Building Block View

The system is decomposed into loosely coupled modules:

```text
src/
├── types.ts           # Core domain entity interfaces & types
├── engine/            # Turn simulation pipeline
│   ├── index.ts       # Main turn resolver entrypoint
│   ├── production.ts  # Planet resource / unit generation
│   ├── movement.ts    # Fleet transit advancement & arrivals
│   └── combat.ts      # Contested arrival & battle resolution
├── map/               # Procedural map & route generation
└── utils/             # Seedable PRNG & math utilities
```

## Level 1 Building Blocks

### 1. Domain Types (`src/types.ts`)
- Holds pure data interfaces: `Planet`, `Route`, `Fleet`, `Order`, `GameState`, `TurnEvent`.
- No business logic or external dependencies.

### 2. Turn Engine (`src/engine/`)
- Pure function executing the resolution sequence.
- Sub-handlers handle specific domain steps:
  - `resolveProduction`: adds forces to owner-held planets.
  - `resolveMovement`: decrements remaining distances for fleets in transit.
  - `resolveCombat`: resolves battles on planets where hostile fleets arrive.

### 3. Map Generator (`src/map/`)
- Generates procedural networks of planets and routes given a seed, player count, and bounds.

### 4. Utilities (`src/utils/`)
- Contains a seedable PRNG (Pseudo-Random Number Generator) ensuring deterministic combat and generation.
