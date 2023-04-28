/* 

Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

// prefix sum approach
function maxSubArrayPrefixSum(numbers: number[]): number {
  const prefixSum = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }

  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      const subArrSum = prefixSum[j] - (i - 1 > 0 ? prefixSum[i - 1] : 0);
      maxSum = Math.max(subArrSum, maxSum);
    }
  }

  return maxSum;
}

function maxSubArrayKadane(numbers: number[]): number {
  let maxSum = numbers[0];
  let maxSoFar = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    maxSoFar = Math.max(numbers[i], maxSoFar + numbers[i]);
    maxSum = Math.max(maxSum, maxSoFar);
  }
  return maxSum;
}

export default function maxSubArray(numbers: number[]): number {
  return maxSubArrayPrefixSum(numbers);
}
