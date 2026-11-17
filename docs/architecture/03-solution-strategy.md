# 03. Solution Strategy

## Guiding Principles & Decisions

1. **Pure Functional Core (Deterministic Game Engine)**
   - The simulation engine is purely functional: `(state, orders, seed) => { nextState, events }`.
   - Side-effects (networking, storage, UI rendering) live in outer shell layers.
   - See [ADR-001](../decisions/architecture/ADR-001-deterministic-game-engine.md).

2. **TypeScript & Node / Standard ESM**
   - Clean, typed models with strict type-checking (`tsc --noEmit`).
   - Fast, reproducible testing via Vitest (`npm test`).

3. **Separation of Architectural vs Domain Decisions**
   - Architectural mechanics (how the system is built and wired) live in `/docs/decisions/architecture/`.
   - Game rules (combat formulas, travel speed, resource production) live in `/docs/decisions/domain/`.

4. **Zero-Side-Effect State Representation**
   - The game state is plain JSON-serializable objects (no hidden class state or circular references).
   - Any state can be dumped to disk, reloaded, or sent across the wire trivially.
