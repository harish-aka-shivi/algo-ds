/* 
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums: number[], target: number) => {
  /* 
    O(n-squared) solution
    
    for(let i = 0; i < nums.length; i++) {
        for (j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
     */

  const map = nums.reduce((acc, num, index) => {
    if (!acc[num]) {
      acc[num] = [];
    }
    acc[num].push(index);
    return acc;
  }, {} as Record<string, number[]>);

  let solution: [number, number] = [0, 0];

  nums.forEach((num, index) => {
    const diff = target - num;
    const arr = map[diff];
    if (arr !== undefined) {
      if (arr[0] !== index) {
        solution = [arr[0], index];
      } else if (arr.length > 1) {
        solution = [arr[1], index];
      }
    }
  });

  return solution;
};
