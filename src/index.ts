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
export const SNAKES = [
  [36, 6],
  [32, 10],
  [18, 2],
  [24, 8],
  [26, 8],
  [56, 15],
  [78, 37]
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
  { grid, snakes, ladders }: Game,
  rl: readline.Interface
) => {
  let player = 0;

  while (!someoneHasWon()) {
    const currentPlayer = players[player];
    rl.write(`\n\n${printGrid(grid, players)}\n\n`);
    rl.write(`${YOUR_MOVE} ${currentPlayer.name}\n`);
    const play = await rl.question(`${PLAY}`);

    if (play === 'p') {
      const diceRoll = rollDice();

      rl.write(`${ROLL} ${diceRoll}\n`);

      currentPlayer.position = updatePosition(
        diceRoll,
        currentPlayer,
        ladders,
        snakes,
        rl
      );

      currentPlayer.position = checkBounceBack(
        grid,
        currentPlayer.position,
        rl
      );

      rl.write(`${NEW_POSITION} ${currentPlayer.position}\n\n`);

      // winning condition
      if (currentPlayer.position === grid.length) {
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
    // this is commented out because you need to use
    // console.log rather than rl.write
    // but this does give you the opportunity to
    // colour the output
    // terminal: false
  });

  const playerOne = await rl.question(`${PLAYER} one? `);
  const playerTwo = await rl.question(`${PLAYER} two? `);

  await runGame(
    [
      { name: playerOne, position: 1, symbol: `${playerOne.charAt(0)}1` },
      { name: playerTwo, position: 1, symbol: `${playerTwo.charAt(0)}2` }
    ],
    gameObject,
    rl
  );
  input.destroy();
};

export default SnakesAndLadders;
