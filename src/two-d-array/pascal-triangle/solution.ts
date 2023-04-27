const generateItem = (previousItem: number[]): number[] => {
  const ans = [];
  for (let i = 0; i < previousItem.length - 1; i++) {
    ans.push(previousItem[i] + previousItem[i + 1]);
  }
  return [1, ...ans, 1];
};

export function generate(numRows: number): number[][] {
  const res = [];

  if (numRows === 1) {
    return [[1]];
  }

  if (numRows === 2) {
    return [[1], [1, 1]];
  }

  res.push([1], [1, 1]);

  for (let i = 2; i < numRows; i++) {
    res.push(generateItem(res[i - 1]));
  }

  return res;
}
