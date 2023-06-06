/* 

Given an integer array nums, return the length of the longest strictly increasing 
subsequence
.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

*/

/* 

Solution: eg
arr = [50, 4, 10, 8, 30, 100, 2]

there will be a dp array and we will start from first element => which will always be 1
dp = [1]

now we will go to second element and check the previous elements of dp and an put the max of dp elements
and add 1
so now dp becomes, since 4 cannot come after 50, also add 1 for it
dp = [1, 1]

next element is 10 => 10 can't come after 50 => then its one , but it can come after 4 (so 1 + dp[position of 4])
so dp becomes [1,1,2]

next is 8: 8 can come after 4 only in previous array. so dp
[1,1,2,2]

next is 30 => can come after 4, 10, 8 => check the dp array values of each value and add 1 and get the max
max will be 3 with 10 and 8 => 4 10 30 or 4 8 30
[1,2,2,3]

next 100 and 2
[1,2,2,3,4, 1]

answer is max of it
*/

function lengthOfLIS(nums: number[]): number {
  const maxArr = [1];
  for (let i = 1; i < nums.length; i++) {
    let localMax = 1;
    maxArr[i] = localMax;
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        localMax = Math.max(localMax, maxArr[j] + 1);
        maxArr[i] = localMax;
      }
    }
  }

  let max = 1;

  for (let i = 0; i < maxArr.length; i++) {
    max = Math.max(max, maxArr[i]);
  }

  return max;
}
