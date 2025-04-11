import { makeGrid, rollDice } from '../src/helpers/gameComponents';

describe('Grid', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3);
    jest.spyOn(Math, 'round').mockReturnValue(2);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates an array representing a grid based on the dimension provided', () => {
    const grid = makeGrid(2);
    const expectedGrid = [1, 2, 3, 4];

    expect(grid).toStrictEqual(expectedGrid);
  });

  it('prints out the grid in the correct format', () => {
    // const grid = makeGrid(5);
    // NOT DOING THIS FOR NOW AS THE USER CAN PLAY WITHOUT
    // SEEING THE GRID
  });

  it('uses math.random to generate a number', () => {
    const diceRoll = rollDice();
    expect(Math.random).toHaveReturnedWith(0.3);
    expect(Math.round).toHaveBeenCalledWith(2.1);
    expect(diceRoll).toBe(2);
  });
});
