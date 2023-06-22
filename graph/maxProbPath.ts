/* 

1514. Path with Maximum Probability
Medium
1.8K
36


You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.


Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000

Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.
*/

function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
  // make a graph
  const graph: Record<string, number[][]> = {};

  // Keep distances for each node
  const distances: Record<string, number> = {};

  for (let i = 0; i < n; i++) {
    graph[i] = [];
    distances[i] = Number.MIN_SAFE_INTEGER;
  }

  // add neighbors
  // for (const edge of edges) {
  //     graph[edge[0]].push(edge[1])
  // }
  for (let i = 0; i < edges.length; i++) {
    graph[edges[i][0]].push([edges[i][1], succProb[i]]);
    graph[edges[i][1]].push([edges[i][0], succProb[i]]);
  }

  // const queue: number[][] = []
  // init
  const set: Record<string, number> = {};

  distances[start] = 1;
  set[start] = 1;
  const visited: Record<string, boolean> = {};

  while (Object.keys(set).length > 0) {
    let max = Number.MIN_SAFE_INTEGER;
    const keys = Object.keys(set);
    let maxKey = '-1';

    for (let i = 0; i < keys.length; i++) {
      if (set[keys[i]] > max) {
        maxKey = keys[i];
        max = set[keys[i]];
      }
    }
    // console.log(maxKey, set[maxKey])
    const top: [string, number] = [maxKey, set[maxKey]];

    delete set[maxKey];

    const node = top[0];
    const weightTop: number = top[1];

    for (const neighborTuple of graph[node]) {
      const neighbor = neighborTuple[0];
      const weight = neighborTuple[1];
      if (!visited[neighbor]) {
        distances[neighbor] = Math.max(weightTop * weight, distances[neighbor]);
        set[neighbor] = distances[neighbor];
      }
    }

    visited[node] = true;
  }
  // console.log(distances, graph, set)
  return distances[end] === Number.MIN_SAFE_INTEGER ? 0 : distances[end];
}
