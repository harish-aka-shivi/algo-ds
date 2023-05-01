export class Graph {
  adjacencyList: Record<string, number[]> = {};

  addEdge(node1: number, node2: number, isUndirected = true) {
    if (!this.adjacencyList[node1]) {
      this.adjacencyList[node1] = [];
    }
    this.adjacencyList[node1].push(node2);
    if (isUndirected) {
      if (!this.adjacencyList[node2]) {
        this.adjacencyList[node2] = [];
      }
      this.adjacencyList[node2].push(node1);
    }
  }

  print() {
    const keys = Object.keys(this.adjacencyList);
    for (let i = 0; i < keys.length; i++) {
      let out = `${i} ---->`;

      for (const val of this.adjacencyList[keys[i]]) {
        out = out + ', ' + val;
      }

      console.log(out);
    }
  }

  bfs(source: number) {
    const visitedMap = {} as Record<string, boolean>;
    const queue: number[] = [];

    queue.push(source);
    visitedMap[source] = true;

    let output = '';

    while (queue.length > 0) {
      const node = queue.shift();
      if (node !== undefined) {
        output = `${output}, ${node}`;

        const neighbors = this.adjacencyList[node];
        if (Array.isArray(neighbors)) {
          for (const neighbor of neighbors) {
            if (!visitedMap[neighbor]) {
              queue.push(neighbor);
              visitedMap[neighbor] = true;
            }
          }
        }
      }
    }
    console.log(output);
  }

  dfsHelper(source: number, visitedMap: Record<string, boolean>) {
    if (visitedMap[source]) {
      return '';
    }

    // console.log(source);
    let output = `${source}`;
    visitedMap[source] = true;

    const neighbors = this.adjacencyList[source];
    for (const neighbor of neighbors) {
      const res = this.dfsHelper(neighbor, visitedMap);
      output = res ? `${output}, ${res}` : output;
    }

    return output;
  }

  dfs(source: number) {
    const visitedMap = {} as Record<string, boolean>;
    const output = this.dfsHelper(source, visitedMap);
    console.log(output);
  }
}

const graph = new Graph();
graph.addEdge(0, 1);
graph.addEdge(0, 4);
graph.addEdge(4, 3);
graph.addEdge(4, 5);
graph.addEdge(5, 10);
graph.addEdge(3, 11);
graph.addEdge(11, 10);
graph.addEdge(1, 8);
graph.addEdge(8, 10);
graph.addEdge(1, 7);
graph.addEdge(7, 10);

// graph.print();

graph.bfs(0);
graph.dfs(0);
