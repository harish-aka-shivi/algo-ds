/* 
34. Find First and Last Position of Element in Sorted Array
Medium
16.7K
397
Companies
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
*/

// return the index of target element
const binarySearch = (nums: number[], target: number): number => {
  let start = 0;
  let end = nums.length - 1;

  while (end >= start) {
    const mid = Math.trunc((start + end) / 2);
    const midElement = nums[mid];
    if (midElement === target) {
      return mid;
    } else if (midElement > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

function searchRange(nums: number[], target: number): number[] {
  const foundElementIndex = binarySearch(nums, target);
  if (foundElementIndex === -1) {
    return [-1, -1];
  }

  let i = foundElementIndex;
  let j = foundElementIndex;
  let left = foundElementIndex;
  let right = foundElementIndex;

  while (nums[i] === target || nums[j] === target) {
    if (nums[i] === target) {
      left = i;
      i--;
    }

    if (nums[j] === target) {
      right = j;
      j++;
    }
  }

  return [left, right];
}
