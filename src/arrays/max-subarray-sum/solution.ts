// prefix sum approach
function maxSubArrayPrefixSum(numbers: number[]): number {
  const prefixSum = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }

  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      const subArrSum = prefixSum[j] - (i - 1 > 0 ? prefixSum[i - 1] : 0);
      maxSum = Math.max(subArrSum, maxSum);
    }
  }

  return maxSum;
}

function maxSubArrayKadane(numbers: number[]): number {
  let maxSum = numbers[0];
  let maxSoFar = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    maxSoFar = Math.max(numbers[i], maxSoFar + numbers[i]);
    maxSum = Math.max(maxSum, maxSoFar);
  }
  return maxSum;
}

export default function maxSubArray(numbers: number[]): number {
  return maxSubArrayPrefixSum(numbers);
}
