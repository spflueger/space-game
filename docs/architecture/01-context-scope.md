# 01. Context & Scope

## 1. Business / Functional Context
The space game is a turn-based, multiplayer territory conquest strategy game. Players command forces across a network of connected planets, exploring, producing units, moving fleets along interstellar routes, and battling opponents.

```text
+-------------------+             +-----------------------+
|  Human Player     |             |  Autonomous Agent     |
|  (Web/CLI Client) |             |  (AI Opponent/Worker) |
+---------+---------+             +-----------+-----------+
          |                                   |
          | Orders (JSON)                     | Orders (JSON)
          v                                   v
+---------------------------------------------------------+
|                  Core Game Engine                       |
|  - Validates orders                                     |
|  - Advances simulation discrete turns                   |
|  - Resolves combat & movements deterministically        |
|  - Emits new GameState & TurnEvents                     |
+---------------------------------------------------------+
                               |
                               v
                     +-------------------+
                     | GameState / Events|
                     +-------------------+
```

## 2. Technical Context & Interfaces
- **Inputs**:
  - `GameState`: Snapshot of the current universe.
  - `Order[]`: List of actions submitted by players for the current turn.
  - `Seed`: Random seed controlling stochastic events (e.g. dice combat).
- **Outputs**:
  - `nextState`: Immutable new game state snapshot.
  - `events`: Log of occurred events (movements, combats, conquests).
