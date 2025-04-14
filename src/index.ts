import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { makeGrid, rollDice, updatePosition } from './helpers/gameComponents';
import { Game, Player } from './types';
import { MORON, PLAY, ROLL, WINNER, YOUR_MOVE } from './lang';

const GRID = makeGrid();

// these will be randomised in the future
// current copied from https://www.ymimports.com/pages/how-to-play-snakes-and-ladders
const SNAKES = [
  [36, 6],
  [32, 10],
  [18, 62],
  [24, 88],
  [26, 48],
  [56, 95],
  [78, 97]
];

const LADDERS = [
  [1, 38],
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
    rl.write(`${YOUR_MOVE} ${currentPlayer.name}\n`);
    const play = await rl.question(`${PLAY}`);

    if (play === 'p') {
      const diceRoll = rollDice();

      rl.write(`${ROLL} ${diceRoll}`);

      currentPlayer.position = updatePosition(
        diceRoll,
        currentPlayer,
        ladders,
        snakes
      );

      // winning condition
      if (currentPlayer.position === 100) {
        rl.write(WINNER);
        someoneHasWon(true);
        break;
      }
      // update player index for the next move
      player = player === 0 ? 1 : 0;
    } else {
      rl.write(MORON);
    }
  }
};

const SnakesAndLadders = async (
  gameObject: Game = { grid: GRID, snakes: SNAKES, ladders: LADDERS }
) => {
  const rl = readline.createInterface(input, output);

  const playerOne = await rl.question('what is your name player one?');
  const playerTwo = await rl.question('what is your name player two?');

  await runGame(
    [
      { name: playerOne, position: 1 },
      { name: playerTwo, position: 1 }
    ],
    gameObject,
    rl
  );

  // to stop the input handler staying open
  input.destroy();
};

export default SnakesAndLadders;
