import { Interface } from 'readline/promises';
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
  return Math.ceil(Math.random() * diceValue);
};

export const togglePlayer = (index: number) => {
  return index === 0 ? 1 : 0;
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
  snakes: number[][],
  rl: Interface
) => {
  let newPosition = roll + player.position;
  const goingUpALadder = ladderCheck(newPosition, ladders);
  const goingDownSnake = snakeCheck(newPosition, snakes);
  if (goingUpALadder) {
    rl.write(
      `Woo, you are going up a ladder from ${newPosition} to ${goingUpALadder}\n`
    );
    newPosition = goingUpALadder;
  } else if (goingDownSnake) {
    rl.write(
      `Lol, you got eaten by a snake dumbass, you have gone from ${newPosition} to ${goingDownSnake}\n`
    );
    newPosition = goingDownSnake;
  }
  return newPosition;
};

export const checkBounceBack = (
  grid: number[],
  oldPostion: number,
  newPosition: number,
  rl: Interface
) => {
  const winningGridValue = grid.length;
  if (newPosition > winningGridValue) {
    const howMuchOverWin = newPosition - winningGridValue;
    const howMuchUnderWinBefore = winningGridValue - oldPostion;

    const bounceBackPosition =
      oldPostion + howMuchUnderWinBefore - howMuchOverWin;
    rl.write(`oh no you bounced back cause your ass rolled too much`);

    return bounceBackPosition;
  }
  return newPosition;
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
