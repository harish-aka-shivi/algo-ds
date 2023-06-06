/* 

5. Longest Palindromic Substring
Medium
25.4K
1.5K
Companies
Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

*/

/* 
    Explaination:

    One approach is calculating all the substring and checking whether all the palindrome and 
    returning the max => O(n3) because => getting all substring * checking substr =>  0(n^2).O(n)
    
    but we can optimize it by how we calculate palindrome, instead of starting from ends we start from 
    the center and move farther away as long as palindrome condition is satisfied.

    so we take two pointer left and right and both are in one current char and then we move out
    there is one edge case though because this way we check for palindrome which are odd, for even
    we either keep the left = i-1 or right = i+1
*/

const longestPalindrome = (s: string): string => {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i;

    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      const substr = s.slice(left, right + 1);
      if (substr.length > res.length) {
        res = substr;
      }
      left -= 1;
      right += 1;
    }

    left = i;
    right = i + 1;
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      const substr = s.slice(left, right + 1);
      if (substr.length > res.length) {
        res = substr;
      }
      left -= 1;
      right += 1;
    }
  }

  return res;
};
