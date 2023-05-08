/* 
118. Pascal's Triangle
    
Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]
 

Constraints:

1 <= numRows <= 30

*/

const generateItem = (previousItem: number[]): number[] => {
  const ans = [] as number[];
  for (let i = 0; i < previousItem.length - 1; i++) {
    ans.push(previousItem[i] + previousItem[i + 1]);
  }
  return [1, ...ans, 1];
};

export function generate(numRows: number): number[][] {
  const res = [] as number[][];

  if (numRows === 1) {
    return [[1]];
  }

  if (numRows === 2) {
    return [[1], [1, 1]];
  }

  res.push([1], [1, 1]);

  for (let i = 2; i < numRows; i++) {
    res.push(generateItem(res[i - 1]));
  }

  return res;
}
