/* 
    You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

    Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

    You may assume that you have an infinite number of each kind of coin.

    

    Example 1:

    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
    Example 2:

    Input: coins = [2], amount = 3
    Output: -1
    Example 3:

    Input: coins = [1], amount = 0
    Output: 0
*/

const coinChangeHelper = (coins: number[], amount: number, memo: Record<string, number>) => {
  if (amount === 0) {
    return 0;
  }

  if (amount < 0) {
    return -1;
  }

  const mins = [];

  for (const coin of coins) {
    const remainingAmount = amount - coin;
    if (remainingAmount >= 0) {
      let remainingMinWays = -1;
      if (memo[remainingAmount] === undefined) {
        remainingMinWays = coinChangeHelper(coins, remainingAmount, memo);
        memo[remainingAmount] = remainingMinWays;
      } else {
        remainingMinWays = memo[remainingAmount];
      }
      if (remainingMinWays >= 0) {
        mins.push(1 + remainingMinWays);
      }
    }
  }

  if (mins.length < 1) {
    return -1;
  }

  return Math.min(...mins);
};
function coinChange(coins: number[], amount: number): number {
  return coinChangeHelper(coins, amount, {});
}
