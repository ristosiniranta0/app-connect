/*
Filename: SophisticatedCode.js
Content: The following code is a sophisticated and complex implementation of a search algorithm called Depth-First Search (DFS) on a graph. It uses an adjacency list representation of the graph and incorporates recursive function calls, iterative loops, and advanced object-oriented programming concepts.
*/

class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }

  DFS(startingVertex) {
    const visited = {};
    for (const vertex of this.vertices) {
      visited[vertex] = false;
    }
    this.DFSUtil(startingVertex, visited);
  }

  DFSUtil(vertex, visited) {
    visited[vertex] = true;
    console.log(vertex);

    const neighbors = this.adjacencyList.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        this.DFSUtil(neighbor, visited);
      }
    }
  }
}

// Test
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("D", "E");
graph.addEdge("C", "E");

graph.DFS("A");

// Output:
// A
// B
// D
// E
// C