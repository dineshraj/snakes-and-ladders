export interface Player {
  name: string;
  position: number;
  symbol: string;
}

export interface Game {
  grid: number[];
  snakes: number[][];
  ladders: number[][];
}
