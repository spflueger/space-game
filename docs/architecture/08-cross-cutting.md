# 08. Cross-Cutting Concepts

## 1. Determinism & Seedable PRNG
- **Strict Prohibition**: Never use `Math.random()` in the game engine or map generation.
- All randomness must be derived from a seedable PRNG (e.g. Mulberry32, Alea, or PCG).
- Given the same `(initialState, orders, seed)`, `resolveTurn()` must produce the exact identical `nextState` across all platforms and test runs.

## 2. State Immutability & Serialization
- Simulation functions must treat input `GameState` as immutable and return a new state object.
- All entities must be JSON-serializable primitives (numbers, strings, arrays, plain objects). Do not store methods, class instances, or closures inside state.

## 3. Testability
- Every state transition must be unit-testable without database, network, or filesystem dependencies.
- Unit tests live alongside implementation files (`*.test.ts`).
