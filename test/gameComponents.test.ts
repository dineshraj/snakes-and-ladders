import {
  ladderCheck,
  snakeCheck,
  makeGrid,
  rollDice,
  updatePosition
} from '../src/helpers/gameComponents';

describe('GameComonents', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3);
    jest.spyOn(Math, 'round').mockReturnValue(2);
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

  it.skip('prints out the grid in the correct format', () => {});

  it('uses math.random to generate a number', () => {
    const diceRoll = rollDice();
    expect(Math.random).toHaveReturnedWith(0.3);
    expect(Math.round).toHaveBeenCalledWith(2.1);
    expect(diceRoll).toBe(2);
  });

  describe('ladders', () => {
    it('return position to move to if you are at the bottom of a ladder', () => {
      const ladders = [[1, 38]];
      const newPosition = 1;
      const ladderValue = ladderCheck(newPosition, ladders);

      expect(ladderValue).toBe(38);
    });

    it('returns false if there is no matching ladder', () => {
      const ladders = [[1, 38]];
      const newPosition = 2;
      const ladderValue = ladderCheck(newPosition, ladders);

      expect(ladderValue).toBe(false);
    });
  });

  describe('snakes', () => {
    it('return position to move to if you are at the head of a snake', () => {
      const snakes = [[38, 22]];
      const newPosition = 38;
      const snakeValue = snakeCheck(newPosition, snakes);

      expect(snakeValue).toBe(22);
    });

    it('returns false if there is no matching ladder', () => {
      const snakes = [[38, 22]];
      const newPosition = 37;
      const snakeValue = snakeCheck(newPosition, snakes);

      expect(snakeValue).toBe(false);
    });
  });

  it('updates the position of a player given the dice roll on an empty square', () => {
    const roll = 4;
    const player = { name: 'mrpoopybutthole', position: 69 };
    const expectedPosition = 73;
    const updatedPlayerPosition = updatePosition(roll, player, [], []);

    expect(updatedPlayerPosition).toBe(expectedPosition);
  });

  it('updates the position of a player given the dice roll on a ladder square', () => {
    const roll = 4;
    const player = { name: 'mrpoopybutthole', position: 69 };
    const updatedPlayerPosition = updatePosition(roll, player, [[73, 87]], []);
    const expectedPosition = 87;

    expect(updatedPlayerPosition).toStrictEqual(expectedPosition);
  });

  it('updates the position of a player given the dice roll on a snake square', () => {
    const roll = 4;
    const player = { name: 'mrpoopybutthole', position: 69 };
    const updatedPlayerPosition = updatePosition(roll, player, [], [[73, 14]]);
    const expectedPosition = 14;

    expect(updatedPlayerPosition).toStrictEqual(expectedPosition);
  });
});
