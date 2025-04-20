import { Interface } from 'readline/promises';
import {
  ladderCheck,
  snakeCheck,
  makeGrid,
  rollDice,
  updatePosition,
  togglePlayer,
  checkBounceBack,
  printGrid,
  prepareGridForPrinting
} from '../src/helpers/gameComponents';

const padThoseMotherFuckingArrayItemsOfArrays = (
  array: Array<number | string>[]
) => {
  // this is because I am lazy
  return array.forEach((item) => {
    return item.toString().padStart(3);
  });
};

describe('GameComponents', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3);
    jest.spyOn(Math, 'ceil').mockReturnValue(2);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates an default array representing a grid based with length 100', () => {
    const grid = makeGrid();
    expect(grid.length).toBe(100);
  });

  it('creates an array representing a grid based on the dimension provided', () => {
    const grid = makeGrid(2);
    const expectedGrid = [1, 2, 3, 4];

    expect(grid).toStrictEqual(expectedGrid);
  });

  describe('visualising the grid', () => {
    it('structures the array in the correct way ready for printing and includes the player position', () => {
      const playerMock = [
        { name: 'Dineshraj', position: 3, symbol: 'D' },
        { name: 'Ooneshraj', position: 10, symbol: 'O' }
      ];
      const grid = makeGrid(6);
      const expectedOutput = [
        ['   36', '   35', '   34', '   33', '   32', '   31'],
        ['   25', '   26', '   27', '   28', '   29', '   30'],
        ['   24', '   23', '   22', '   21', '   20', '   19'],
        ['   13', '   14', '   15', '   16', '   17', '   18'],
        ['   12', '   11', '\x1b[32m    O\x1b[0m', '    9', '    8', '    7'],
        ['    1', '    2', '\x1b[32m    D\x1b[0m', '    4', '    5', '    6']
      ];
      const printedGrid = prepareGridForPrinting(grid, playerMock);

      expect(printedGrid).toStrictEqual(expectedOutput);
    });

    it('structures the array in the correct way ready for printing when the player is at the start of a line', () => {
      const playerMock = [
        { name: 'Dineshraj', position: 24, symbol: 'D' },
        { name: 'Ooneshraj', position: 12, symbol: 'O' }
      ];
      const grid = makeGrid(6);
      const expectedOutput = [
        ['   36', '   35', '   34', '   33', '   32', '   31'],
        ['   25', '   26', '   27', '   28', '   29', '   30'],
        ['\x1b[32m    D\x1b[0m', '   23', '   22', '   21', '   20', '   19'],
        ['   13', '   14', '   15', '   16', '   17', '   18'],
        ['\x1b[32m    O\x1b[0m', '   11', '   10', '    9', '    8', '    7'],
        ['    1', '    2', '    3', '    4', '    5', '    6']
      ];
      const printedGrid = prepareGridForPrinting(grid, playerMock);

      expect(printedGrid).toStrictEqual(expectedOutput);
    });

    it('accounts for players being on the same square', () => {
      const playerMock = [
        { name: 'Dineshraj', position: 10, symbol: 'D' },
        { name: 'Ooneshraj', position: 10, symbol: 'O' }
      ];
      const grid = makeGrid(6);
      const expectedOutput = [
        ['   36', '   35', '   34', '   33', '   32', '   31'],
        ['   25', '   26', '   27', '   28', '   29', '   30'],
        ['   24', '   23', '   22', '   21', '   20', '   19'],
        ['   13', '   14', '   15', '   16', '   17', '   18'],
        ['   12', '   11', '\x1B[32m  D/O\x1B[0m', '    9', '    8', '    7'],
        ['    1', '    2', '    3', '    4', '    5', '    6']
      ];
      const printedGrid = prepareGridForPrinting(grid, playerMock);

      expect(printedGrid).toStrictEqual(expectedOutput);
    });

    it('prints out the grid in the correct format', () => {
      const playerMock = [
        { name: 'Dineshraj', position: 3, symbol: 'D' },
        { name: 'Ooneshraj', position: 10, symbol: 'O' }
      ];
      const grid = makeGrid(4);

      const expectedOutput =
        '   16    15    14    13\n    9 \u001b[32m    O\u001b[0m    11    12\n    8     7     6     5\n    1     2 \u001b[32m    D\u001b[0m     4';

      const printedGrid = printGrid(grid, playerMock);
      expect(printedGrid).toStrictEqual(expectedOutput);
    });
  });

  it('uses math.random to generate a number', () => {
    const diceRoll = rollDice();
    expect(Math.random).toHaveReturnedWith(0.3);
    expect(Math.ceil).toHaveBeenCalledWith(2.1);
    expect(diceRoll).toBe(2);
  });

  describe('bounceBack()', () => {
    it('bounces back if the dice roll leads to a total above 100', () => {
      const newPosition = checkBounceBack(makeGrid(), 105, {
        write: jest.fn()
      } as unknown as Interface);
      const expectedPosition = 95;

      expect(newPosition).toBe(expectedPosition);
    });

    it('does not bounce back if the dice roll leads to a total below 100', () => {
      const newPosition = checkBounceBack(makeGrid(), 10, {
        write: jest.fn()
      } as unknown as Interface);
      const expectedPosition = 10;

      expect(newPosition).toBe(expectedPosition);
    });
  });

  describe('ladderCheck', () => {
    it('return position to move to if you are at the bottom of a ladder', () => {
      const ladders = [[1, 38]];
      const newPosition = 1;
      const ladderValue = ladderCheck(newPosition, ladders);

      expect(ladderValue).toBe(38);
    });

    it('returns the roll position if there is no matching ladder', () => {
      const ladders = [[1, 38]];
      const newPosition = 2;
      const ladderValue = ladderCheck(newPosition, ladders);

      expect(ladderValue).toBe(2);
    });
  });

  describe('snakeCheck', () => {
    it('return position to move to if you are at the head of a snake', () => {
      const snakes = [[38, 22]];
      const newPosition = 38;
      const snakeValue = snakeCheck(newPosition, snakes);

      expect(snakeValue).toBe(22);
    });

    it('returns the existing position if there is no matching ladder', () => {
      const snakes = [[38, 22]];
      const newPosition = 37;
      const snakeValue = snakeCheck(newPosition, snakes);

      expect(snakeValue).toBe(37);
    });
  });

  describe('updatePosition()', () => {
    it('updates the position of a player given the dice roll on an empty square', () => {
      const roll = 4;
      const player = { name: 'mrpoopybutthole', position: 69, symbol: 'm' };
      const expectedPosition = 73;
      const updatedPlayerPosition = updatePosition(roll, player, [], [], {
        question: jest.fn(),
        write: jest.fn()
      } as unknown as Interface);

      expect(updatedPlayerPosition).toBe(expectedPosition);
    });

    it('updates the position of a player given the dice roll on a ladder square', () => {
      const roll = 4;
      const player = { name: 'mrpoopybutthole', position: 69, symbol: 'm' };
      const updatedPlayerPosition = updatePosition(
        roll,
        player,
        [[73, 87]],
        [],
        {
          question: jest.fn(),
          write: jest.fn()
        } as unknown as Interface
      );
      const expectedPosition = 87;

      expect(updatedPlayerPosition).toStrictEqual(expectedPosition);
    });

    it('updates the position of a player given the dice roll on a snake square', () => {
      const roll = 4;
      const player = { name: 'mrpoopybutthole', position: 69, symbol: 'm' };
      const updatedPlayerPosition = updatePosition(
        roll,
        player,
        [],
        [[73, 14]],
        {
          question: jest.fn(),
          write: jest.fn()
        } as unknown as Interface
      );
      const expectedPosition = 14;

      expect(updatedPlayerPosition).toStrictEqual(expectedPosition);
    });
  });

  describe('togglePlayer()', () => {
    it('changes the current player after a completed go', () => {
      let currentPlayerIndex = 0;
      let newPlayerIndex = togglePlayer(currentPlayerIndex);

      expect(newPlayerIndex).toBe(1);

      currentPlayerIndex = 1;
      newPlayerIndex = togglePlayer(currentPlayerIndex);
      expect(newPlayerIndex).toBe(0);
    });
  });
});
