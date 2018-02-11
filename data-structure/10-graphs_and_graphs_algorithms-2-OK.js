/**
 * Graphs and graphs algorithms
 *
 * A graph consists of a set of vertices and a set of edges.
 *
 * Example : Think of a map of a US state. Each
 *              town is connected with other towns via some type of road. A map is a type of graph
 *              where each town is a vertex, and a road that connects two towns is an edge. Edges are
 *              defined as a pair (v1, v2), where v1 and v2 are two vertices in a graph.
 *
 * A vertex can also have a weight, which is sometimes called a cost.
 *
 * A graph whose pairs are ordered is called a directed graph, or just a digraph.
 *
 * When pairs are ordered in a directed graph, an arrow is drawn from one pair to another pair.
 *
 * Directed graphs indicate the flow direction from vertex to vertex.
 *
 * If a graph is not ordered, it is called an unordered graph, or just a graph.
 *
 * A path is a sequence of vertices in a graph such that all vertices in the path are connected
 * by edges. The length of a path is the number of edges from the first vertex in the path
 * to the last vertex. A path can also consist of a vertex to itself, which is called a loop.
 * Loops have a length of 0.
 *
 * A cycle is a path with at least one edge whose first and last vertices are the same.
 *
 * A simple cycle is one with no repeated edges or vertices for both directed and undirected graphs.
 *
 * Paths that repeat other vertices besides the first and last vertices are called general cycles.
 *
 * Two vertices are considered strongly connected if there is a path from the first vertex to
 * the second vertex, and vice versa.
 *
 * If the graph is a directed graph, and all its vertices are strongly connected, then the directed graph
 * is considered strongly connected.
 */

/**
 * Vertex Class.
 *
 * @property {string} [label='']
 * @property {boolean} [wasVisited=false] Indicate whether or not the vertex has been visited
 *
 */
class Vertex {
  /**
   * Creates an instance of Vertex.
   * @param {string} [label='']
   * @memberof Vertex
   */
  constructor(label = "") {
    this.label = label;
    this.wasVisited = false;
  }
}
/**
 * The method used for representing the edges of a graph is called an adjacency list,
 * or an array of adjacency lists.
 *
 * @class Graph
 * @property {array}    vertices            ex: graph.addVertex(1); => vertices[0] = 1 graph.addVertex(2); => vertices[1] = [2]
 * @property {array}    edges               adjacents edges list of each vertices given the vertex value Ex: vertex = 2 connected with 4 and 7 : edges[2] = [4, 7]
 * @property {number}   [numberOfEdges=0]   total of ex: graph.addEdge(1, 2); => numberOfEdges = numberOfEdges + 1
 */
class Graph {
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
  }
  /**
   *
   *
   * @param {number || string} vertex
   * @memberof Graph
   */
  addVertex(vertex = 0) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
  }
  /**
   *
   *
   * @param {number || string} [vertex=-1]
   * @memberof Graph
   */
  removeVertex(vertex = -1) {
    const index = this.vertices.indexOf(vertex);
    if (~index) {
      this.vertices.splice(index, 1);
    }
    while (this.edges[vertex].length) {
      const adjacentVertex = this.edges[vertex].pop();
      this.removeEdge(adjacentVertex, vertex);
    }
  }
  /**
   *
   *
   * @param {number || string} [vertex1=null]
   * @param {number || string} [vertex2=null]
   * @memberof Graph
   */
  addEdge(vertex1 = null, vertex2 = null) {
    if (!vertex1 || !vertex1)
      throw new Error('The "addEdge" method require two params.');
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
    this.numberOfEdges++;
  }
  /**
   *
   *
   * @param {number || string} [vertex1=null]
   * @param {number || string} [vertex2=null]
   * @memberof Graph
   */
  removeEdge(vertex1 = null, vertex2 = null) {
    if (!vertex1 || !vertex1)
      throw new Error('The "removeEdge" method require two params.');
    const index1 = this.edges[vertex1]
      ? this.edges[vertex1].indexOf(vertex2)
      : -1;
    const index2 = this.edges[vertex2]
      ? this.edges[vertex2].indexOf(vertex1)
      : -1;
    if (~index1) {
      this.edges[vertex1].splice(index1, 1);
      this.numberOfEdges--;
    }
    if (~index2) {
      this.edges[vertex2].splice(index2, 1);
    }
  }
  /**
   * Return the amount of vertices in the graph.
   *
   * @returns
   * @memberof Graph
   */
  size() {
    return this.vertices.length;
  }
  /**
   * Return the amount of edges in the graph.
   *
   * @returns {array}
   * @memberof Graph
   */
  relations() {
    return this.numberOfEdges;
  }
  /**
   * Depth-first search method.
   *
   * @param {number || string} [vertex=-1]
   * @param {function}         [fn=x => console.log(x)]
   * @returns {void}
   * @memberof Graph
   */
  traverseDFS(vertex = -1, fn = x => console.log(x)) {
    if (!~this.vertices.indexOf(vertex)) {
      return console.log("Vertex not found");
    }
    const visited = [];
    this._traverseDFS(vertex, visited, fn);
  }
  /**
   *
   *
   * @param {number || string}  [vertex=-1]
   * @param {array}             [visited=[]]
   * @param {function}          [fn=x => console.log(x)]
   * @memberof Graph
   */
  _traverseDFS(vertex = -1, visited = [], fn = x => console.log(x)) {
    visited[vertex] = true;
    if (this.edges[vertex] !== undefined) {
      fn(vertex);
    }
    for (let i = 0; i < this.edges[vertex].length; i++) {
      if (!visited[this.edges[vertex][i]]) {
        this._traverseDFS(this.edges[vertex][i], visited, fn);
      }
    }
  }
  /**
   * Breadth-first search method.
   *
   * @param {number || string} [vertex=-1]
   * @param {function}         [fn=x => console.log(x)]
   * @returns {void}
   * @memberof Graph
   */
  traverseBFS(vertex = -1, fn = x => console.log(x)) {
    if (!~this.vertices.indexOf(vertex)) {
      return console.log("Vertex not found");
    }
    const queue = [];
    queue.push(vertex);
    const visited = [];
    visited[vertex] = true;

    while (queue.length) {
      vertex = queue.shift();
      fn(vertex);
      for (let i = 0; i < this.edges[vertex].length; i++) {
        if (!visited[this.edges[vertex][i]]) {
          visited[this.edges[vertex][i]] = true;
          queue.push(this.edges[vertex][i]);
        }
      }
    }
  }
  /**
   * It shows us the path that connect two different vertices of a graph
   *
   * @param {number || string} [vertexSource=-1]
   * @param {number || string} [vertexDestination=-1]
   * @returns {string} Ex: 6-4-3-2-1
   * @memberof Graph
   */
  pathFromTo(vertexSource = -1, vertexDestination = -1) {
    if (!~this.vertices.indexOf(vertexSource)) {
      return console.log("Vertex not found");
    }
    const queue = [];
    queue.push(vertexSource);
    const visited = [];
    visited[vertexSource] = true;
    const paths = [];

    while (queue.length) {
      const vertex = queue.shift();
      for (let i = 0; i < this.edges[vertex].length; i++) {
        if (!visited[this.edges[vertex][i]]) {
          visited[this.edges[vertex][i]] = true;
          queue.push(this.edges[vertex][i]);
          // save paths between vertices
          paths[this.edges[vertex][i]] = vertex;
        }
      }
    }
    if (!visited[vertexDestination]) {
      return undefined;
    }

    const path = [];
    for (var j = vertexDestination; j != vertexSource; j = paths[j]) {
      path.push(j);
    }
    path.push(j);
    return path.reverse().join("-");
  }
  /**
   * Print vertices relations Ex.  1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
   *
   * @memberof Graph
   */
  print() {
    console.group('Graph vertices relations :')
    this.vertices.map(function(vertex) {
        console.log(`${vertex} -> ${this.edges[vertex].join(', ')}`);
      }, this);
    console.groupEnd();
  }
}

// Initial test
const graph = new Graph();

graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->

graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4

console.log('---');
console.log('graph size (number of vertices):', graph.size()); // => 6
console.log('---');
console.log('graph relations (number of edges):', graph.relations()); // => 7
console.log('---');

graph.traverseBFS(1, vertex => { console.log(vertex); }); // => 1 2 5 3 4 6
console.log('---');
graph.traverseDFS(0, vertex => { console.log(vertex); }); // => 'Vertex not found'
console.log('---');
graph.traverseBFS(0, vertex => { console.log(vertex); }); // => 'Vertex not found'
console.log('---');

console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
console.log('---');
console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
console.log('---');

graph.removeEdge(1, 2);
graph.removeEdge(4, 5);
graph.removeEdge(10, 11);

console.log('graph relations (number of edges):', graph.relations()); // => 5
console.log('---');
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-5-1
console.log('---');

graph.addEdge(1, 2);
graph.addEdge(4, 5);


console.log('graph relations (number of edges):', graph.relations()); // => 7
console.log('---');
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
console.log('---');

graph.removeVertex(5);

console.log('graph size (number of vertices):', graph.size()); // => 5
console.log('---');
console.log('graph relations (number of edges):', graph.relations()); // => 4
console.log('---');
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1


/**
 * Algorithm for performing a depth-first search.
 * 
 * Depth-first search involves following a path from the beginning vertex until it reaches 
 * the last vertex, then backtracking and following the next path until it reaches the last 
 * vertex, and so on until there are no paths left.
 * 
 * It visit a vertex that has not already been visited, mark it as having been visited, 
 * then recursively visit the other unvisited vertices that are in the original vertex’s 
 * adjacency list.
 * 
 */

/**
 * Breadth-First Search
 * 
 * A breadth-first search starts at a first vertex and tries to visit vertices as close to the first
 * vertex as possible.
 * 
 * In essence, this search moves through a graph layer by layer, first examining layers closer to 
 * the first vertex and then moving down to the layers farthest away from the starting vertex.
 * 
 * The algorithm for breadth-first search uses a queue abstraction instead of an array
 * abstraction for storing visited vertices. The algorithm works as follows:
 * 
    1. Find an unvisited vertex that is adjacent to the current vertex, add it to the list of
        visited vertices, and add it to the queue.

    2. Take the next vertex, v, from the graph and add it to the list of visited vertices.

    3. Add all unmarked vertices that are are adjacent to v and add them to the queue.
*/


   /*
        Finding the Shortest Path

        One of the most common operations performed on graphs is finding the shortest path
        from one vertex to another. 
        
        Consider the following example: for vacation, you are going
        to travel to 10 major-league cities to watch baseball games over a two-week period. You
        want to minimize the number of miles you have to drive to visit all 10 cities using a
        shortest-path algorithm. 
        
        Another shortest-path problem involves creating a network of
        computers, where the cost could be the time to transmit data between two computers
        or the cost of establishing and maintaining the connection. A shortest-path algorithm
        can determine the most effective way to build the network.
    */
        /**
         * Breadth-First Search Leads to Shortest Paths
         * 
         *  When we perform a breadth-first search, we are automatically finding the shortest paths
            from one vertex to another connected vertex.

            For example, when we want to find the shortest path from vertex A to vertex D, we first 
            look for any one-edge paths from A to D, then two-edge paths from A to D, and so on.

            This is exactly the way breadth-first search works, so we can easily modify the breadth-first 
            search algorithm to find shortest paths.
          
         */