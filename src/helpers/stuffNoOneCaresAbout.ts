export const padItem = (item: number | string) => {
  return item.toString().padStart(5);
};

export const padArrayItems = (array: Array<number | string>) => {
  const paddedArray = array.map((item) => {
    return padItem(item);
  });

  return paddedArray;
};

export const amIOdd = (value: number) => {
  return value % 2 !== 0;
};
