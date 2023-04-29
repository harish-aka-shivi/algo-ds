/* 
    50. Pow(x, n)
    Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

    

    Example 1:

    Input: x = 2.00000, n = 10
    Output: 1024.00000
    Example 2:

    Input: x = 2.10000, n = 3
    Output: 9.26100
    Example 3:

    Input: x = 2.00000, n = -2
    Output: 0.25000
    Explanation: 2-2 = 1/22 = 1/4 = 0.25
    

    Constraints:

    -100.0 < x < 100.0
    -231 <= n <= 231-1
    n is an integer.
    -104 <= xn <= 104

*/

// const pow = (x: number, n: number): number => {
//     if (n === 0) {
//         return 1
//     }

//     return x * pow(x, n - 1)
// };

const powOptimised = (x: number, n: number): number => {
  if (n === 0) {
    return 1;
  }

  if (n % 2 === 0) {
    const halfPower = powOptimised(x, Math.trunc(n / 2));
    return halfPower * halfPower;
  } else {
    const halfPower = powOptimised(x, Math.trunc((n - 1) / 2));
    return x * halfPower * halfPower;
  }

  // return x * myPow(x, n - 1)
};

function myPow(x: number, n: number): number {
  if (n < 0) {
    return 1 / powOptimised(x, -1 * n);
  }

  return powOptimised(x, n);
}
