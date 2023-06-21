/* 

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107


*/

function subarraySum(nums: number[], k: number): number {
  const map = { 0: 1 } as Record<string, number>;

  let count = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = sum + nums[i];
    const remainingSum = sum - k;

    if (map[remainingSum]) {
      count = count + map[remainingSum];
    }

    map[sum] = map[sum] ? map[sum] + 1 : 1;
  }

  return count;
}
