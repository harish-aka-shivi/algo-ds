class GraphNode {
  value: string;
  neighbors: string[] = [];
  constructor(name: string) {
    this.value = name;
  }
}

export class GraphUsingNode {
  map: Record<string, GraphNode> = {};

  constructor(nodes: string[]) {
    for (const node of nodes) {
      this.map[node] = new GraphNode(node);
    }
  }

  addEdge(node1: string, node2: string, isUndirected = true) {
    if (!this.map[node1].neighbors) {
      this.map[node1].neighbors = [];
    }
    this.map[node1].neighbors.push(node2);

    if (isUndirected) {
      if (!this.map[node2].neighbors) {
        this.map[node2].neighbors = [];
      }
      this.map[node2].neighbors.push(node1);
    }
  }

  print() {
    const keys = Object.keys(this.map);

    for (const val of keys) {
      const node = this.map[val];
      const neighbors = node.neighbors;

      let out = `${node.value} ---->`;

      for (const neighbor of neighbors) {
        out = out + ', ' + neighbor;
      }

      console.log(out);
    }
  }
}

const graph = new GraphUsingNode(['delhi', 'mumbai', 'chandigarh', 'kolkata', 'banglore']);

graph.addEdge('delhi', 'mumbai');
graph.addEdge('chandigarh', 'mumbai');
graph.addEdge('chandigarh', 'delhi');
graph.addEdge('kolkata', 'delhi');
graph.addEdge('kolkata', 'banglore');
graph.addEdge('banglore', 'mumbai');
graph.addEdge('mumbai', 'delhi');
graph.print();
