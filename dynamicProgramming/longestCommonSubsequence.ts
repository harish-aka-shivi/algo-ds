const findSubsequences = (
  str: string,
  dpMap: Record<string, string[]>,
  occurenceMap: Record<string, number>,
): string[] => {
  if (str.length < 1) {
    return [''];
  }
  const firstChar = str[0];
  const remaining = str.slice(1);

  let smallerAns = [];
  if (dpMap[remaining]) {
    smallerAns = dpMap[remaining];
  } else {
    smallerAns = findSubsequences(remaining, dpMap, occurenceMap);
    dpMap[remaining] = smallerAns;
  }
  const ans = [];
  // let ans = smallerAns.map(str => firstChar + str)
  // return [...ans, ...smallerAns]
  for (let i = 0; i < smallerAns.length; i++) {
    const str = smallerAns[i];
    const pair = firstChar + str;
    ans.push(str);
    ans.push(pair);
    occurenceMap[str] = 1;
    occurenceMap[pair] = 1;
  }

  return ans;
};
