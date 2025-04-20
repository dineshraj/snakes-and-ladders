import { makeGrid } from '../src/helpers/gameComponents';
import { padItem, padArrayItems, amIOdd } from '../src/helpers/stuffNoOneCaresAbout';

describe('stuffNoOneCaresAbout', () => {
  describe('padAItem', () => {
    it('pads out an item so they all have three characters', () => {
      const grid = makeGrid(4);
      const paddedItem = padItem(grid[0]);
      const expectedItem = '    1';

      expect(paddedItem).toBe(expectedItem);
    });
  });

  describe('paddArrayItems', () => {
    it('pads out each item in an array', () => {
      const grid = makeGrid(2);
      const paddedArray = padArrayItems(grid);

      const expectedArray = ['    1', '    2', '    3', '    4'];

      expect(paddedArray).toStrictEqual(expectedArray);
    });
  });

  describe('amIOdd', () => {
    it('tells you if a number is odd or even', () => {
      let isOdd = amIOdd(40);
      expect(isOdd).toBe(false);

      isOdd = amIOdd(41);
      expect(isOdd).toBe(true);
    });
  });
});
