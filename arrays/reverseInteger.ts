/* 

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1


*/

function reverse(x: number): number {
  const sign = Math.sign(x);
  const abs = Math.abs(x);

  const numberArr = `${abs}`.split('');
  let res = '';
  for (let i = numberArr.length - 1; i >= 0; i--) {
    res = `${res}${numberArr[i]}`;
  }

  const resNum = sign * parseInt(res);

  return resNum > Math.pow(2, 31) - 1 || resNum < Math.pow(-2, 31) ? 0 : resNum;
}
