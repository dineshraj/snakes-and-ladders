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
      `Lol, you got eaten by a snake you actual fuck, you have gone from ${newPosition} to ${goingDownSnake}\n`
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
    rl.write(
      `oh no you bounced back to ${bounceBackPosition} cause your ass rolled too much`
    );

    return bounceBackPosition;
  }
  return newPosition;
};

export const amIOdd = (value: number) => {
  return value % 2 !== 0;
};

export const prepareGridForPrinting = (grid: number[], players: Player[]) => {
  const preparedArray: (string | number)[][] = [];
  const reversedGrid = grid.reverse();
  const gridWidth = Math.sqrt(reversedGrid.length);
  let gridLine: (number | string)[] = [];
  let line = 0;

  for (let i = 0; i < reversedGrid.length; i++) {
    gridLine.push(reversedGrid[i]);

    // make a function
    const playersAtCurrentPosition = players.filter((player) => {
      if (player.position === reversedGrid.length - (i + 1)) {
        return player;
      }
    });

    if (playersAtCurrentPosition.length === 1) {
      gridLine[gridLine.length] = playersAtCurrentPosition[0].symbol;
      i++;
    } else if (playersAtCurrentPosition.length === 2) {
      gridLine[gridLine.length] =
        `${playersAtCurrentPosition[0].symbol}/${playersAtCurrentPosition[1].symbol}`;
      i++;
    }

    if ((i + 1) % gridWidth === 0) {
      if (amIOdd(line)) {
        gridLine.reverse();
      }
      preparedArray.push(gridLine);
      gridLine = [];
      line++;
    }
  }

  return preparedArray;
};

export const printGrid = (grid: number[], players: Player[]) => {
  const preparedGrid = prepareGridForPrinting(grid, players);

  const printableGrid = preparedGrid.map((line) => line.join(' ')).join('\n');

  return printableGrid;
};
