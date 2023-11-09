/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addNode(node) {
    this.nodes.add(node);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addNodes(nodeArray) {
    for (let node of nodeArray) {
      this.addNode(node);
    }
  }

  /** add edge between nodes n1,n2 */
  addEdge(n1, n2) {
    n1.adjacent.add(n2);
    n2.adjacent.add(n1);
  }

  /** remove edge between nodes n1,n2 */
  removeEdge(n1, n2) {
    n1.adjacent.delete(n2);
    n2.adjacent.delete(n1);
  }

  /** remove node from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that node
   */
  removeNode(node) {
    this.nodes.delete(node);

    for (let n of this.nodes) {
      if (n.adjacent.has(node)) {
        this.removeEdge(n, node);
      }
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = new Set([start])) {
    /* recursive solution */
    // let nodeValues = [];
    // nodeValues.push(start.value);

    // for (let ads of start.adjacent) {
    //   if (!seen.has(ads)) {
    //     seen.add(ads);
    //     return [...nodeValues, ...this.depthFirstSearch(ads, seen)];
    //   }
    // }
    // return nodeValues;

    /* iterative solution */
    let toVisitStack = [start];
    let nodeValues = [];

    while (toVisitStack.length > 0) {
      let current = toVisitStack.pop();

      nodeValues.push(current.value);

      for (let node of current.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          toVisitStack.push(node);
        }
      }
    }

    return nodeValues;
  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let nodeValues = [];
    let seen = new Set([start]);

    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();

      nodeValues.push(current.value);

      for (let node of current.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          toVisitQueue.push(node);
        }
      }
    }

    return nodeValues;
  }

  /** find the distance of the shortest path from the start node to the end node */
  distanceOfShortestPath(start, end) {
    let toVisitQueue = [start];
    let seen = new Set([start]);
    let distance = 0;
    let added = false;

    while (toVisitQueue.length > 0 ) {
      let current = toVisitQueue.shift();

      if (current.value === end.value) {
        break;
      }

      added = false;
      for (let node of current.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          toVisitQueue.push(node);
          added = true;
        }
      }

      if (added) distance++;
    }

    if (!seen.has(end)) return undefined;
    return distance;
  }
}

module.exports = { Graph, Node };
