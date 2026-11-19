export interface Planet {
  id: string;
  name: string;
  ownerId: string | null;
  forces: number;
  productionRate: number;
}

export interface Route {
  from: string;
  to: string;
  distance: number;
}

export interface GameState {
  turn: number;
  planets: Record<string, Planet>;
  routes: Route[];
}
