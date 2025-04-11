export const makeGrid = (size: number = 10) => {
  const gridLength = size ** 2;
  const grid = Array.from({ length: gridLength }, (_element, index) => {
    return index + 1;
  });
  return grid;
};

export const rollDice = () => {
  const diceValue = 6 + 1;
  return Math.round(Math.random() * diceValue);
};

// NOT DOING THIS FOR NOW AS THE USER CAN PLAY WITHOUT
// THE GRID
// export const printGrid = (grid: number[]) => {
  /*
    loop through the grid and if mod 10 is 0 then
    add a new line character and do the next, until you are at the end.
    DONT FORGET on every even row the order needs to be reversed
    DONT FORGET you need to start from the bottom

    e.g.:
    21 22 23 24 25
    20 19 18 17 16
    11 12 13 14 15
    10  9  8  7  6  
    1  2   3  4  5

  */

  // return grid;
//  }