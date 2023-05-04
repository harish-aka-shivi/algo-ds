const coinChangeBottomUp = (coins: number[], amount: number): number => {
  const dp: number[] = [0];

  for (let i = 1; i <= amount; i++) {
    let min = Number.MAX_SAFE_INTEGER;

    for (const coin of coins) {
      if (i - coin >= 0 && dp[i - coin] !== Number.MAX_SAFE_INTEGER) {
        min = Math.min(min, 1 + dp[i - coin]);
      }
    }
    dp[i] = min;
  }

  return dp[amount] !== Number.MAX_SAFE_INTEGER ? dp[amount] : -1;
};
