/* 
1752. Check if Array Is Sorted and Rotated

Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return false.

There may be duplicates in the original array.

Note: An array A rotated by x positions results in an array B of the same length such that A[i] == B[(i+x) % A.length], where % is the modulo operation.

 

Example 1:

Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 3 positions to begin on the the element of value 3: [3,4,5,1,2].
Example 2:

Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.
Example 3:

Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.
 


*/

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
