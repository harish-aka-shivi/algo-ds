/* 
    QUESTION

    1143. Longest Common Subsequence
    Medium
    10.8K
    131
    Companies
    Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

    A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

    For example, "ace" is a subsequence of "abcde".
    A common subsequence of two strings is a subsequence that is common to both strings.

    

    Example 1:

    Input: text1 = "abcde", text2 = "ace" 
    Output: 3  
    Explanation: The longest common subsequence is "ace" and its length is 3.
    Example 2:

    Input: text1 = "abc", text2 = "abc"
    Output: 3
    Explanation: The longest common subsequence is "abc" and its length is 3.
    Example 3:

    Input: text1 = "abc", text2 = "def"
    Output: 0
    Explanation: There is no such common subsequence, so the result is 0.
    

    Constraints:

    1 <= text1.length, text2.length <= 1000
    text1 and text2 consist of only lowercase English characters. 
*/

/* 
    Discussion:

    First approach => Find all subsequence of both the string 
    and make a hash map for it
    the go through keys of  one hashmap and if 
    there is a corresponding string in the map. if present
    track the max count. This was not very performant and there 
    were issues when large string was input

    Second approach. Dynamic problem top down approach with memoization 
    map. 
    If two char of string matches, find subsequence length for substr
    for both the string and add 1
    if does not match find the max for both the substring

    Also causing issues with large string


    Third approach bottom up
    Matrix solution

*/

/* 

FIRST APPROACH => not very performant

const findSubsequences = (
  str: string,
  dpMap: Record<string, string[]>,
  occurrenceMap: Record<string, number>,
): string[] => {
  if (str.length < 1) {
    return [''];
  }
  const firstChar = str[0];
  const slicedStr = str.slice(1);

  let slicedStrSubsequences = [];
  if (dpMap[slicedStr]) {
    slicedStrSubsequences = dpMap[slicedStr];
  } else {
    slicedStrSubsequences = findSubsequences(slicedStr, dpMap, occurrenceMap);
    dpMap[slicedStr] = slicedStrSubsequences;
  }
  const output = [];

  for (let i = 0; i < slicedStrSubsequences.length; i++) {
    const subsequence = slicedStrSubsequences[i];
    const combinedSub = firstChar + subsequence;
    output.push(subsequence);
    output.push(combinedSub);
    occurrenceMap[subsequence] = 1;
    occurrenceMap[combinedSub] = 1;
  }

  return output;
};


function longestCommonSubsequence(text1: string, text2: string): number {
    const subsequenceMapText1 = {}
    const dpMapText1 = {}
    findSubsequences(text1, dpMapText1, subsequenceMapText1)
  
    const subsequenceMapText2 = {}
    const dpMapText2 = {}
    const subsText2 = findSubsequences(text2, dpMapText2, subsequenceMapText2)
    
    let max = 0
    for(const sub of subsText2) {
        if (subsequenceMapText1[sub]) {
            max = Math.max(max, sub.length)
        }
    }

    return max
};


*/

/* 

SOLUTION 2: Dynamic programming bottom down approach, 
still failing some tests

const getKey = (text1: string, text2: string) => {
  return `${text1}-${text2}`;
};

const longestCommonSubsequenceHelper = (text1: string, text2: string, map: Record<string, number>) => {
  if (text1.length === 0 || text2.length === 0) {
    return 0;
  }

  if (text1[0] === text2[0]) {
    const text1Sliced = text1.slice(1);
    const text2Sliced = text2.slice(1);
    const newKey = getKey(text1Sliced, text2Sliced);
    if (map[newKey] === undefined) {
      const equalStringSub = longestCommonSubsequenceHelper(text1Sliced, text2Sliced, map);
      map[newKey] = equalStringSub;
    }
    return 1 + map[newKey];
  } else {
    const text1Sliced = text1.slice(1);
    const text2Sliced = text2.slice(1);

    const leftKey = getKey(text1, text2Sliced);
    if (map[leftKey] === undefined) {
      const val = longestCommonSubsequenceHelper(text1, text2Sliced, map);
      map[leftKey] = val;
    }

    const rightKey = getKey(text1Sliced, text2);

    if (map[rightKey] === undefined) {
      const val = longestCommonSubsequenceHelper(text1Sliced, text2, map);
      map[rightKey] = val;
    }

    return Math.max(map[leftKey], map[rightKey]);
  }
};

function longestCommonSubsequence(text1: string, text2: string): number {
  const map = {};
  const res = longestCommonSubsequenceHelper(text1, text2, map);
  //  console.log(map)
  return res;
} 

*/

/* 
    SOLUTION 3: Dynamic programming bottom up approach

    IT follows a matrix
*/

export const longestCommonSubsequence = (text1: string, text2: string): number => {
  const dp: Array<number[]> = [];

  for (let i = 0; i <= text1.length; i++) {
    if (!dp[0]) {
      dp[0] = [];
    }
    dp[0][i] = 0;
  }

  for (let i = 0; i <= text2.length; i++) {
    if (!dp[i]) {
      dp[i] = [];
    }
    dp[i][0] = 0;
  }

  for (let i = 1; i <= text2.length; i++) {
    for (let j = 1; j <= text1.length; j++) {
      if (text1[j - 1] === text2[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text2.length][text1.length];
};

//////////////  another simpler way
// top down approach
/* 
  So the logic behind is that:

  take string ABCD and ABEDG

  if (s1[i] = s2[j]) 1 + lcs(s1(i+1), s2(j+1))
  
  if two chars are not equal like in subproblem CD and EDG
  we will take two cases  and take the max of it
    - C is taken and E is ignored lcs(s1(i), s2(j+ 1))
    - E is taken and C is ignored lcs(s1(i+1), s2(j))
*/

const getKey = (i: number, j: number) => {
  return `${i}_${j}`;
};

const lcs = (s1: string, s2: string, i: number, j: number, dp: Record<string, number>): number => {
  if (i === s1.length || j === s2.length) {
    return 0;
  }

  const key = getKey(i, j);

  if (dp[key] !== undefined) {
    return dp[key];
  }

  if (s1[i] === s2[j]) {
    const res = 1 + lcs(s1, s2, i + 1, j + 1, dp);
    dp[key] = res;
    return res;
  }

  const option1 = lcs(s1, s2, i + 1, j, dp);
  const option2 = lcs(s1, s2, i, j + 1, dp);

  const res = Math.max(option1, option2);
  dp[key] = res;
  return res;
};

console.log(lcs('ABCD', 'ABEDG', 0, 0, {}));
