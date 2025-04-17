import SnakesAndLadders, {
  someoneHasWon,
  GRID,
  SNAKES,
  LADDERS
} from '../src/.';
import * as snakesAndLadders from '../src/.';
import readline, { Interface } from 'node:readline/promises';
import { MORON, NEW_POSITION, ROLL, WINNER, YOUR_MOVE } from './lang';
import * as gameComponents from './helpers/gameComponents';

jest.mock('node:readline/promises', () => {
  return {
    createInterface: jest.fn()
  };
});

describe('Snakes and Ladders', () => {
  let someoneHasWonSpy: jest.SpyInstance;
  let runGameSpy: jest.SpyInstance;
  let rollDiceSpy: jest.SpyInstance;
  let updatePosition: jest.SpyInstance;

  const grid = gameComponents.makeGrid();
  const snakes = [
    [36, 6],
    [32, 10],
    [18, 62]
  ];
  const ladders = [
    [3, 38],
    [4, 14],
    [8, 10]
  ];

  beforeEach(() => {
    someoneHasWonSpy = jest.spyOn(snakesAndLadders, 'someoneHasWon');
    runGameSpy = jest.spyOn(snakesAndLadders, 'runGame');
    rollDiceSpy = jest
      .spyOn(gameComponents, 'rollDice')
      .mockImplementation(() => 1);
    updatePosition = jest.spyOn(gameComponents, 'updatePosition');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('has an entry point', () => {
    expect(SnakesAndLadders).toBeDefined();
    expect(typeof SnakesAndLadders).toBe('function');
  });

  describe('Game', () => {
    it('accepts a user object and the initial game data', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Ooneshraj'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonSpy.mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 1, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await SnakesAndLadders(gameObjectMock);

      expect(runGameSpy).toHaveBeenCalledWith(playerMock, gameObjectMock, rl);
    });

    it('defaults to the in-game grid and snakes and ladders', async () => {
      const rl = {
        question: jest
          .fn()
          .mockReturnValueOnce('Dee')
          .mockReturnValueOnce('Ooo'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonSpy.mockReturnValueOnce(true);

      const playerMock = [
        {
          name: 'Dee',
          position: 1,
          symbol: 'D'
        },
        {
          name: 'Ooo',
          position: 1,
          symbol: 'O'
        }
      ];

      await SnakesAndLadders();

      expect(snakesAndLadders.runGame).toHaveBeenCalledWith(
        playerMock,
        {
          grid: GRID,
          snakes: SNAKES,
          ladders: LADDERS
        },
        rl
      );
    });

    it('takes the players turn when they press p', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest.fn().mockResolvedValueOnce('p'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      rollDiceSpy.mockReturnValueOnce(4);

      someoneHasWonSpy
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 1, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(rl.write).toHaveBeenCalledWith(`${YOUR_MOVE} Dineshraj\n`);
      expect(rl.write).toHaveBeenCalledWith(`${ROLL} 4\n`);
      expect(rl.write).toHaveBeenCalledWith(`${YOUR_MOVE} Ooneshraj\n`);
    });

    it('does not take the turn if the player does not press p', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest.fn().mockResolvedValueOnce('peepee'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonSpy
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 0, symbol: 'D' },
        { name: 'Ooneshraj', position: 0, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(rl.write).toHaveBeenCalledWith(MORON);
    });

    it('tells you your new position on the grid', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest.fn().mockResolvedValueOnce('p'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonSpy.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 68, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(rl.write).toHaveBeenCalledWith(`${NEW_POSITION} 69\n\n`);
    });

    it('takes the player up a ladder if they get to that position', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest.fn().mockResolvedValueOnce('p'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      rollDiceSpy.mockReturnValueOnce(3);

      someoneHasWonSpy.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 1, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(updatePosition).toHaveBeenCalledWith(
        3,
        playerMock[0],
        ladders,
        snakes,
        expect.any(Object)
      );

      expect(updatePosition).toHaveReturnedWith(14);
    });

    it('takes the player down a snake if they get to that position', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest.fn().mockResolvedValueOnce('p'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      rollDiceSpy.mockReturnValueOnce(1);

      someoneHasWonSpy.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const playerMock = [
        { name: 'Dineshraj', position: 35, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(updatePosition).toHaveBeenCalledWith(
        1,
        playerMock[0],
        ladders,
        snakes,
        expect.any(Object)
      );

      expect(updatePosition).toHaveReturnedWith(6);
    });

    it('declares a winner if a player gets to 100', async () => {
      const gameObjectMock = {
        grid,
        snakes,
        ladders
      };

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Ooneshraj')
          .mockResolvedValueOnce('p'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      rollDiceSpy.mockReturnValueOnce(1);

      const playerMock = [
        { name: 'Dineshraj', position: 99, symbol: 'D' },
        { name: 'Ooneshraj', position: 1, symbol: 'O' }
      ];

      await snakesAndLadders.runGame(playerMock, gameObjectMock, rl);

      expect(rl.write).toHaveBeenCalledWith(`${WINNER}`);
    });

    describe('someoneHasWon', () => {
      it('returns the correct value', () => {
        const value = someoneHasWon(true);
        expect(value).toBe(true);
      });

      it('default to the correct value', () => {
        const value = someoneHasWon();
        expect(value).toBe(false);
      });
    });
  });
});
