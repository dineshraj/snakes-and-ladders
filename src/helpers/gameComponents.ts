import { Player } from '../types';

export const makeGrid = (size: number = 10) => {
  const gridLength = size ** 2;
  const grid = Array.from({ length: gridLength }, (_element, index) => {
    return index + 1;
  });
  return grid;
};

export const rollDice = () => {
  const diceValue = 6 + 1;
  return Math.round(Math.random() * diceValue);
};

export const ladderCheck = (newPosition: number, ladders: number[][]) => {
  const matchingLadder = ladders.find((ladder) => ladder[0] === newPosition);

  return matchingLadder ? matchingLadder[1] : false;
};

export const snakeCheck = (newPosition: number, snakes: number[][]) => {
  const matchingSnake = snakes.find((snake) => snake[0] === newPosition);

  return matchingSnake ? matchingSnake[1] : false;
};

export const updatePosition = (
  roll: number,
  player: Player,
  ladders: number[][],
  snakes: number[][]
) => {
  let newPosition = roll + player.position;
  const goingUpALadder = ladderCheck(newPosition, ladders);
  const goingDownSnake = snakeCheck(newPosition, snakes);

  if (goingUpALadder) {
    newPosition = goingUpALadder;
  } else if (goingDownSnake) {
    newPosition = goingDownSnake;
  }
  return newPosition
};

/*
  NOT DOING THIS FOR NOW AS THE USER CAN PLAY WITHOUT THE GRID
  
  export const printGrid = (grid: number[]) => {
    loop through the grid and if mod 10 is 0 then
    add a new line character and do the next, until you are at the end.
    DONT FORGET on every even row the order needs to be reversed
    DONT FORGET you need to start from the bottom

    e.g.:
    21 22 23 24 25
    20 19 18 17 16
    11 12 13 14 15
    10  9  8  7  6  
    1  2   3  4  5
}
*/
