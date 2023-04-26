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
