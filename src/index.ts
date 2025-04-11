import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { makeGrid } from './helpers/gameComponents';
import { Game, Players } from '../types';

/* this is just "notepad" code */
/*


const SnakesAndLadders = (dimension: number = 10) => {
  rl = whatever

  name1 = rl.question(enter your name player 1)
  name2 = rl.question(enter your name player 2)
  
  const players = [
    { name: name1, position: 0 }
    { name: name2, position: 0 }
  ]
  return 'hello';
};

export const someoneHasWon = (won: boolean: false) => {
  return won;
}

export const runGame(grid, snakes, ladders) {
  while (!someoneHasWon()) {
  }
}

*/

/* */

const GRID = makeGrid(10);

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
}

export const runGame = (players: Players[], { grid, snakes, ladders }: Game) => {
  let currentPlayer = 0;

  while (!someoneHasWon()) {
    console.log('someone has not won');
  }


  /*
    while someone hasn't won //make this a function so I can mock it
    user1 plays by rolling the dice
    check their new position doesn't land on the head of the snake or the bottom of the ladder
      update the position property accordingly
      swap player  
  */
};

const SnakesAndLadders = async (gameObject: Game = {grid: GRID, snakes: SNAKES, ladders: LADDERS}) => {
  const rl = readline.createInterface(input, output);

  const playerOne = await rl.question('what is your name player one?');
  const playerTwo = await rl.question('what is your name player two?');

  runGame([{ name: playerOne, position: 0 }, { name: playerTwo, position: 0 }], gameObject);
};

export default SnakesAndLadders;
