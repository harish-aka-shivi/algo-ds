/* 

494. Target Sum
Medium
9.2K
312
Companies
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

 

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000


*/

const findTargetHelper = (nums: number[], target: number, map: Record<string, number>): number => {
  const key = `${nums.length}__${target}`;

  if (nums.length < 1) {
    if (target === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  if (map[key] !== undefined) {
    return map[key];
  }

  const remainingArr = nums.slice(1);

  const ifNegativeThenWays = findTargetHelper(remainingArr, target - -1 * nums[0], map);
  const ifPositiveThenWays = findTargetHelper(remainingArr, target - nums[0], map);

  const count = ifNegativeThenWays + ifPositiveThenWays;

  map[key] = count;

  return count;
};

function findTargetSumWays(nums: number[], target: number): number {
  const obj = {};
  const count = findTargetHelper(nums, target, obj);
  return count;
}
