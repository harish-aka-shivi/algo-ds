// merge sort
const mergeSort = (nums: number[]): number[] => {
  if (nums.length <= 1) {
    return nums;
  }

  const halfLength = Math.trunc(nums.length / 2);

  const left = mergeSort(nums.slice(0, halfLength));
  const right = mergeSort(nums.slice(halfLength));

  let i = 0;
  let j = 0;
  const sortedArray = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else {
      sortedArray.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    sortedArray.push(left[i]);
    i++;
  }

  while (j < right.length) {
    sortedArray.push(right[j]);
    j++;
  }

  return sortedArray;
};

function sortArray(nums: number[]): number[] {
  return mergeSort(nums);
}
