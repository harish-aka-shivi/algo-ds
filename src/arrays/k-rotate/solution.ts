/**
 Do not return anything, modify nums in-place instead.
 */
export function rotate(nums: number[], k: number): void {
  const len = nums.length;
  const rotation = k % len;
  for (let i = 0; i < rotation; i++) {
    const lastEl = nums[len - 1];
    nums.splice(len - 1, 1);
    nums.unshift(lastEl);
  }
}
