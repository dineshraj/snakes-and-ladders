export interface Players {
  name: string;
  position: number;
}

export interface Game {
  grid: number[];
  snakes: number[][];
  ladders: number[][];
}
