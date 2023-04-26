// Assuming nums to be sorted
const twoSumPointer = (nums: number[], target: number, spliced: number) => {
  let i = 0;
  let j = nums.length - 1;
  const results = [];
  while (j > i) {
    const sum = nums[i] + nums[j];
    if (sum === target) {
      results.push([spliced, nums[i], nums[j]]);
      i++;
      j--;
    } else if (sum > target) {
      j--;
    } else if (sum < target) {
      i++;
    }
  }

  return results;
};

const threeSum = (nums: number[]): number[][] => {
  if (nums.length < 3) {
    return [];
  }

  const results = [];
  const duplicateCheck: Record<string, boolean> = {};
  nums.sort((a, b) => a - b);
  const copiedArr = nums.slice();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    copiedArr.splice(i, 1);

    const returnedResult = twoSumPointer(copiedArr, 0 - num, num);

    for (const res of returnedResult) {
      res.sort((a, b) => a - b);
      const resKey = `${res[0]}-${res[1]}-${res[2]}`;
      if (!duplicateCheck[resKey]) {
        results.push(res);
        duplicateCheck[resKey] = true;
      }
    }
    copiedArr.splice(i, 0, num);
  }

  return results;
};
