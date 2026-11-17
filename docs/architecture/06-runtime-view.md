# 06. Runtime View

## Turn Resolution Pipeline

Each turn advances through a strictly ordered pipeline:

```text
[ Current GameState + Submitted Orders ]
                   │
                   ▼
       1. Order Validation & Deductions
       (Verify fleet orders, deduct forces from source planets)
                   │
                   ▼
       2. Fleet Creation & Movement Advancement
       (Create in-transit fleets, advance existing fleets along routes)
                   │
                   ▼
       3. Arrival & Combat Resolution
       (Fleets reaching destination planets trigger battles if contested)
                   │
                   ▼
       4. Planetary Production
       (Controlled planets generate new units according to production rate)
                   │
                   ▼
       5. Objective & Victory Check
       (Evaluate win conditions: player elimination, turn limit, target score)
                   │
                   ▼
       6. Emit Next GameState + Events
```

## Concurrency & Order Resolution
- Orders from all players are resolved simultaneously.
- If two opposing players send fleets toward each other on the same route, they do not intercept in deep space in the initial milestone; they pass each other and arrive at their destinations (subject to future DDRs).
- All stochastic elements during combat consume values from the deterministic PRNG sequence initialized with the turn seed.
