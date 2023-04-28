const printIncreasingNumbers = (n: number, arr: number[]) => {
  if (n < 1) {
    return;
  }
  printIncreasingNumbers(n - 1, arr);
  arr.push(n);
};
