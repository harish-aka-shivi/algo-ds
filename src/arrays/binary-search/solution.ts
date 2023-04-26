const searchRecursive = (nums: number[], target: number): number => {
  const length = nums.length;
  const middle = Math.trunc(length / 2);
  const middleValue = nums[middle];
  if (length < 1) {
    return -1;
  }
  if (middle >= length - 1) {
    return middleValue === target ? middle : -1;
  }
  if (middleValue === target) {
    return middle;
  } else if (middleValue > target) {
    return search(nums.slice(0, middle), target);
  } else {
    const res = search(nums.slice(middle, length), target);
    return res === -1 ? -1 : middle + res;
  }
};

const searchIter = (nums: number[], target: number): number => {
  let initial = 0;
  let end = nums.length - 1;

  while (initial <= end) {
    const mid = Math.trunc((end + initial) / 2);
    const midValue = nums[mid];
    if (midValue === target) {
      return mid;
    } else if (midValue > target) {
      end = mid - 1;
    } else {
      initial = mid + 1;
    }
  }
  return -1;
};

export function search(nums: number[], target: number): number {
  // return searchRecursive(nums, target)
  return searchIter(nums, target);
}
