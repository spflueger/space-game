# ADR-001: Pure Deterministic Game Engine

- **Status**: Accepted
- **Date**: 2026-11-16
- **Deciders**: space-game team

## Context & Problem Statement
The game requires asynchronous simultaneous turn resolution, multiplayer synchronization, and easy replayability/testing. 

## Decision
The core game engine logic (map generation, movement, combat, production, state updates) will be implemented as pure, deterministic functions driven by seedable random number generators and discrete state transitions:
`resolveTurn(previousState, orders, seed) -> { nextState, events }`

## Consequences
### Positive
- 100% reproducible states and bugs using recorded seeds.
- Extremely easy to test via automated unit tests with no mocks needed.
- Decoupled completely from transport (WebSockets, HTTP, or CLI) and presentation.

### Trade-offs
- Randomness must strictly go through a seedable PRNG rather than `Math.random()`.
