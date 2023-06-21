/* 

207. Course Schedule
Medium
13.6K
548
Companies
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.


Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.


Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

*/

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // make a graph
  const graph: Record<string, number[]> = {};
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }

  // put dependencies in the graph
  prerequisites.forEach((pair) => {
    graph[pair[0]].push(pair[1]);
  });

  const inDegree: Record<string, number> = {};

  Object.keys(graph).forEach((key) => {
    const val = graph[key];

    val.forEach((num) => {
      inDegree[num] = inDegree[num] === undefined ? 1 : inDegree[num] + 1;
    });

    if (!inDegree[key]) {
      inDegree[key] = 0;
    }
  });

  const zeroDegreeQueue: string[] = Object.keys(inDegree).filter((key) => inDegree[key] === 0);

  if (zeroDegreeQueue.length === 0) {
    return false;
  }

  while (zeroDegreeQueue.length > 0) {
    const key = zeroDegreeQueue.shift();
    if (key !== undefined) {
      const neighbors = graph[key];

      for (const nei of neighbors) {
        inDegree[nei]--;

        if (inDegree[nei] === 0) {
          zeroDegreeQueue.push(`${nei}`);
        }
      }
    }
  }

  let res = true;

  for (const val of Object.values(inDegree)) {
    if (val !== 0) {
      res = false;
    }
  }

  return res;
}
