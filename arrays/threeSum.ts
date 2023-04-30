/* 

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

*/

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
