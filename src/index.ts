import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {
  checkBounceBack,
  makeGrid,
  printGrid,
  rollDice,
  togglePlayer,
  updatePosition
} from './helpers/gameComponents';
import { Game, Player } from './types';
import {
  MORON,
  NEW_POSITION,
  PLAY,
  PLAYER,
  ROLL,
  WINNER,
  YOUR_MOVE
} from './lang';

export const GRID = makeGrid();

// these will be randomised in the future
// current copied from https://www.ymimports.com/pages/how-to-play-snakes-and-ladders
export const SNAKES = [
  [36, 6],
  [32, 10],
  [18, 62],
  [24, 88],
  [26, 48],
  [56, 95],
  [78, 97]
];

export const LADDERS = [
  [2, 38],
  [4, 14],
  [8, 10],
  [21, 42],
  [28, 76],
  [50, 67],
  [71, 92],
  [80, 99]
];

export const someoneHasWon = (value: boolean = false) => {
  return value;
};

export const runGame = async (
  players: Player[],
  { snakes, ladders }: Game,
  rl: readline.Interface
) => {
  let player = 0;

  while (!someoneHasWon()) {
    const currentPlayer = players[player];
    rl.write(`\n\n${printGrid(GRID, players)}\n\n`)
    rl.write(`${YOUR_MOVE} ${currentPlayer.name}\n`);
    const play = await rl.question(`${PLAY}`);

    if (play === 'p') {
      const diceRoll = rollDice();

      rl.write(`${ROLL} ${diceRoll}\n`);
      const oldPosition = currentPlayer.position;

      currentPlayer.position = updatePosition(
        diceRoll,
        currentPlayer,
        ladders,
        snakes,
        rl
      );

      currentPlayer.position = checkBounceBack(
        GRID,
        oldPosition,
        currentPlayer.position,
        rl
      );

      rl.write(`${NEW_POSITION} ${currentPlayer.position}\n\n`);

      // winning condition
      if (currentPlayer.position === 100) {
        rl.write(WINNER);
        return;
      } else {
        // update player index for the next move
        player = togglePlayer(player);
      }
    } else {
      rl.write(MORON);
    }
  }
  return;
};

const SnakesAndLadders = async (
  gameObject: Game = { grid: GRID, snakes: SNAKES, ladders: LADDERS }
) => {
  const rl = readline.createInterface({
    input,
    output
  });

  const playerOne = await rl.question(`${PLAYER} one? `);
  const playerTwo = await rl.question(`${PLAYER} two? `);

  await runGame(
    [
      { name: playerOne, position: 1, symbol: playerOne.charAt(0) },
      { name: playerTwo, position: 1, symbol: playerTwo.charAt(0) }
    ],
    gameObject,
    rl
  );
  input.destroy();
};

export default SnakesAndLadders;
