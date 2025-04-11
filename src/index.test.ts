import SnakesAndLadders, { someoneHasWon } from '../src/.';
import * as snakesAndLadders from '../src/.';
import readline, { Interface } from 'node:readline/promises';

jest.mock('node:readline/promises', () => {
  return {
    createInterface: jest.fn()
  };
});

describe('Snakes and Ladders', () => {
  let runGameMock: jest.SpyInstance;
  let someoneHasWonMock: jest.SpyInstance;
  
  
  beforeEach(() => {
    someoneHasWonMock = jest.spyOn(snakesAndLadders, 'someoneHasWon');;
    runGameMock = jest.spyOn(snakesAndLadders, 'runGame');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('has an entry point', () => {
    expect(SnakesAndLadders).toBeDefined();
    expect(typeof SnakesAndLadders).toBe('function');
  });

  it('accepts a user object and the initial game data', async () => {
    const grid = [1, 2, 3, 4, 5, 6];
    const snakes = [
      [36, 6],
      [32, 10],
      [18, 62]
    ];
    const ladders = [
      [1, 38],
      [4, 14],
      [8, 10]
    ];
    const gameObjectMock = {
      grid,
      snakes,
      ladders
    };

    const rl = {
      question: jest
        .fn()
        .mockResolvedValueOnce('Dineshraj')
        .mockResolvedValueOnce('Chloe'),
      write: jest.fn()
    } as unknown as Interface;

    jest.mocked(readline.createInterface).mockReturnValue(rl);

    someoneHasWonMock.mockReturnValueOnce(true)

    const playerMock = [
      { name: 'Dineshraj', position: 0 },
      { name: 'Chloe', position: 0 }
    ];

    await SnakesAndLadders(gameObjectMock);

    expect(runGameMock).toHaveBeenCalledWith(playerMock, gameObjectMock);
  });

  it('returns the correct value from the someoneHasWon function', () => {
    const value = someoneHasWon(true);
    expect(value).toBe(true);
  });
});
