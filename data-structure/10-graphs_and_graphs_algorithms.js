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
    constructor(label = '') {
        this.label = label;
        this.wasVisited = false;
    }
}

// The method we will use for representing the edges of a graph is called an adjacency list, or an array of adjacency lists.

class Graph {
    constructor(v = 1) {
        this.vertices = v;     
        this.edges = 0; // track of how many edges are represented in a graph
        this.adj = [];  // adjacents edges list of each vertices given its position

        for (let i = 0; i < this.vertices; ++i) {
            this.adj[i] = []; // array of edge related with each vertices
            this.adj[i].push(""); // edge array initialization, TODO: check if this has meaning
        }

        this.marked = []; // used to perform algorithm depth-first searchs
        for (let i = 0; i < this.vertices; ++i) {
            this.marked[i] = false;
        }

        this.edgeTo = []; // array that keeps track of edges from one vertex to the next one, its records the paths
    }

    resetMarked() {
        for (let i = 0; i < this.vertices; ++i) {
            this.marked[i] = false;
        }
    }
    /**
     * When this function is called with two vertices, A and B, the function finds the adjacency
     * list for vertex A and adds B to the list, then it finds the adjacency list for B and adds A
     * to the list. Finally, the function increments the number of edges by 1.
     * 
     * @param {string} [v=new Vertex('vertice1')] 
     * @param {string} [w=new Vertex('vertice2')] 
     * @memberof Graph
     */
    addEdge(v = new Vertex('vertice1') ,w = new Vertex('vertice2')) {
        if(this.adj[v][0] === "")
            this.adj[v][0] = w;
        else
            this.adj[v].push(w);

        if(this.adj[w][0] === "")
            this.adj[w][0] = v;
        else
            this.adj[w].push(v);
    }

    showGraph() {
        console.group('Showing Graph data:');
            for (var i = 0; i < this.vertices; ++i) {
                console.log(`Adjacency edges list of vertice ${i} -> `);
                for (var j = 0; j < this.vertices; ++j) {
                    if (this.adj[i][j] != undefined)
                    console.log(`edge with ${this.adj[i][j]}`);
                }
                console.log("\n");
            }
        console.groupEnd();
    }
    /*********************************
    *       depth-first search       *
    *********************************/
    /**
     * depth-first search method
     * 
     * @param {any} v 
     * @memberof Graph
     */
    dfs(v) {
        this.marked[v] = true;

        // if statement for console.log is not required
        if (this.adj[v] != undefined)
            console.log("Visited vertex: " + v);

        const edgesListofV = this.adj[v];
        
        for (let vertex of edgesListofV) {
            if (!this.marked[vertex]) {
                this.dfs(vertex);
            }
        }
    }

    buildPath(parents, targetNode) {
      const result = [ targetNode ];

      while (parents[targetNode] !== null) {
        targetNode = parents[targetNode];
        result.push(targetNode);
      }

      return result.reverse();
    }
    /**
     * Breath-First graph searching algorithm.
     * Returns the shortest path between startNode and targetNode.<br><br>
     * Time complexity: O(|V|^2).
     *
     * @public
     * @module graphs/searching/bfs
     * @param {Array} graph Adjacency matrix, which represents the graph.
     * @param {Number} startNode Start node.
     * @param {Number} targetNode Target, which should be reached.
     * @returns {Array} Shortest path from startNode to targetNode.
     *
     * @example
     * var bfs = require('path-to-algorithms/src/graphs/searching/bfs').bfs;
     * var graph = [[1, 1, 0, 0, 1, 0],
     *              [1, 0, 1, 0, 1, 0],
     *              [0, 1, 0, 1, 0, 0],
     *              [0, 0, 1, 0, 1, 1],
     *              [1, 1, 0, 1, 0, 0],
     *              [0, 0, 0, 1, 0, 0]];
     * var shortestPath = bfs(graph, 1, 5); // [1, 2, 3, 5]
     */
     findShortestPath({graph = this, startNode = 0 , targetNode = this.vertices - 1}) {
      var parents = [];
      var queue = [];
      var visited = [];
      var current;

      if( graph === this ) graph = graph.adj;

      queue.push(startNode);
      parents[startNode] = null;
      visited[startNode] = true;

      while (queue.length) {
        current = queue.shift();

        if (current === targetNode) {
          return this.buildPath(parents, targetNode);
        }

        for (var i = 0; i < graph.length; i++) {
          if (i !== current && graph[current][i] && !visited[i]) {
            parents[i] = current;
            visited[i] = true;
            queue.push(i);
          }
        }
      }

      return null;
    };
    /*********************************
    *       depth-first search       *
    *********************************/
    /**
     * The algorithm for breadth-first search
     * 
     * @param {any} s vertex
     * @memberof Graph
     */
    bfs(s) {
        const queue = [];

        this.resetMarked(); // avoid previous configurations
        this.marked[s] = true;

        queue.push(s); // add to back of queue

        while (queue.length > 0) {
            const v = queue.shift(); // remove vertex from front of queue

            if (v != undefined) {
                console.log("Visited vertex: " + v);
            }

            for(let w of this.adj[v]) {
                if (!this.marked[w]) {
                    this.edgeTo[w] = v;
                    this.marked[w] = true;
                    queue.push(w);
                }
            }
        }
    }

    /**
     * It shows us the paths that connect the different vertices of a graph
     * 
     * This function, pathTo(), creates a stack that stores all the vertices that have
     * edges in common with a specified vertex.
     * 
     * @param {any} v 
     * @returns {stack} paths
     * @memberof Graph
     */
    pathTo(v) {
        const source = 0;

        if (!this.hasPathTo(v)) {
            return undefined;
        }

        const path = [];

        for (let i = v; i != source; i = this.edgeTo[i]) {
            path.push(i);
        }

        path.push(s);// prev path.push(s); but doesn't make sense; check this
        return path;
    }


    hasPathTo(v) {
        return this.marked[v];
    }

    toString () {}
}


const g = new Graph(5);

g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);

g.showGraph();/*
    0 -> 1 2
    1 -> 0 3
    2 -> 0 4
    3 -> 1
    4 -> 2
*/
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
        // Test the depth-first search
        console.group('Test the depth-first search of vertex : 0')
            g.dfs(0);
        console.groupEnd()/*
          Test the depth-first search of vertex : 0
            Visited vertex: 0
            Visited vertex: 1
            Visited vertex: 3
            Visited vertex: 2
            Visited vertex: 4
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
        // Test Performing a breadth-first search
        console.group('Test the breadth-first search of vertex : 0')
            g.bfs(0);
        console.groupEnd();/*
          Test the breadth-first search of vertex : 0
            Visited vertex: 0
            Visited vertex: 1
            Visited vertex: 3
            Visited vertex: 2
            Visited vertex: 4
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
             // Test Performing a breadth-first search of the shortest path
             
            //g.addEdge(4,5);
            console.group('Test the breadth-first search of vertex the shortest path: 0 -> 3')
                g.findShortestPath({ startNode: 0 , targetNode:3 });
            console.groupEnd();/*
              Test the breadth-first search of vertex : 0
                Visited vertex: 0
                Visited vertex: 1
                Visited vertex: 3
                Visited vertex: 2
                Visited vertex: 4
            */

//         var vertex = 4;
//         var paths = g.pathTo(vertex);
        
// //         while (paths.length > 0) {
// //             if (paths.length > 1) {
// //                 console.log(paths.pop() + '-');
// //             } else {
// //                 console.log(paths.pop());
// //             }
// //         }