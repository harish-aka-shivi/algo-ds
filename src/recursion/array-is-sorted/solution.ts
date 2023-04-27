const arrayIsSorted = (nums: number[]): boolean => {
  if (nums.length === 0 || nums.length === 1) {
    return true;
  }

  if (nums.length === 2) {
    return nums[1] >= nums[0];
  }

  let isSorted = true;
  for (let i = 1; i < nums.length - 1; i++) {
    isSorted = isSorted && nums[i - 1] <= nums[i] && nums[i] <= nums[i + 1];
  }
  return isSorted;
};

const arrayIsSortedRec = (nums: number[]): boolean => {
  if (nums.length < 2) {
    return true;
  }

  return nums[1] > nums[0] && arrayIsSortedRec(nums.slice(1));
};

function check(nums: number[]): boolean {
  let inflectionPointCount = 0;
  let rotatedBy = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] < nums[i]) {
      inflectionPointCount++;
      rotatedBy = i + 1;
    }
  }

  if (inflectionPointCount > 1) {
    return false;
  }

  const newArray = nums.map((item, index) => nums[(rotatedBy + index) % nums.length]);

  return arrayIsSorted(newArray);
}
