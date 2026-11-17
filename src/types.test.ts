import { describe, it, expect } from "vitest";
import type { Planet } from "./types.js";

describe("Core Domain Types", () => {
  it("should create a valid planet object", () => {
    const planet: Planet = {
      id: "p-1",
      name: "Terra Prime",
      ownerId: "player-1",
      forces: 10,
      productionRate: 2,
    };

    expect(planet.id).toBe("p-1");
    expect(planet.ownerId).toBe("player-1");
    expect(planet.forces).toBe(10);
  });
});
