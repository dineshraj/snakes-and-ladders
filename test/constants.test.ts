import { DICE_ROLL_LIMIT } from '../src/constants';

describe('Constants', () => {
  it('DICE_ROLL_LIMIT returns 7 as the value to apply to Math.random', () => {
    expect(DICE_ROLL_LIMIT).toBe(7);
  });
});
