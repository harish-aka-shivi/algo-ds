/* 
828. Count Unique Characters of All Substrings of a Given String
Hard
1.9K
238
Companies
Let's define a function countUniqueChars(s) that returns the number of unique characters on s.

For example, calling countUniqueChars(s) if s = "LEETCODE" then "L", "T", "C", "O", "D" are the unique characters since they appear only once in s, therefore countUniqueChars(s) = 5.
Given a string s, return the sum of countUniqueChars(t) where t is a substring of s. The test cases are generated such that the answer fits in a 32-bit integer.

Notice that some substrings can be repeated so in this case you have to count the repeated ones too.

 

Example 1:

Input: s = "ABC"
Output: 10
Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
Every substring is composed with only unique letters.
Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
Example 2:

Input: s = "ABA"
Output: 8
Explanation: The same as example 1, except countUniqueChars("ABA") = 1.
Example 3:

Input: s = "LEETCODE"
Output: 92
 

Constraints:

1 <= s.length <= 105
s consists of uppercase English letters only.



*/

/* 

const countUniqueChars = (s: string) => {
    const unique = s.split('').reduce((acc, item) => {
        if (acc[item]) {
            acc[item] = -1
        } else {
            acc[item] = 1
        }
        return acc
    }, {} as Record<string, number>)

    return Object.values(unique).filter(vl => vl === 1).length
}


function uniqueLetterString(s: string): number {
    let count = 0
    for(let i = 0; i < s.length; i++) {
        for(let j = i + 1; j <= s.length; j++) {
            const substr = s.slice(i, j)
            const uniqueCount = countUniqueChars(substr)
            count += uniqueCount
        }
    }

    return count
};

 */

// optimized
const uniqueLetterString = (s: string) => {
  const positionMap = {} as Record<string, number[]>;
  for (let i = 0; i < s.length; i++) {
    if (!positionMap[s[i]]) {
      positionMap[s[i]] = [-1, i];
    } else {
      positionMap[s[i]].push(i);
    }
  }

  Object.values(positionMap).forEach((val) => {
    val.push(s.length);
  });

  // a b b a
  // a: {0: [-1, 3], 3: [3, -1]}
  // {a: [-1, 0, 3], b: [-1, 1,2] }

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const pos = positionMap[s[i]];
    const left = pos[0];
    const right = pos[2];
    const current = pos[1];

    const leftPossibleNumber = current - left;
    const rightPossibleNumber = right - current;

    pos.splice(0, 1);

    sum += leftPossibleNumber * rightPossibleNumber;
  }

  return sum;
};
