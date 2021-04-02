import { Graph } from './commonInterfaces';

interface Nodes {
    [key: string]: number
}

interface Paths {
    [key: string]: Array<number>
}

export class dijkstraTracer{
    costs: Nodes;
    paths: Paths;
    #graph: Graph;
    #startNode: number;
    
    constructor(graph: Graph, startNode: number = 0) {
      this.#graph = graph;
      this.#startNode = startNode;
      this.costs = {};
      this.paths = {};
      this.setCostsAndPaths();
    }

    setCostsAndPaths() {
      const nodes = Array.from(Array(this.#graph.length).keys());
      const unvisitedNodes: Set<number> = new Set(nodes);
      const paths: Paths = arrayToObject(nodes, []);
      const costs: Nodes = arrayToObject(nodes, Infinity);
      costs[this.#startNode] = 0;

      let currentNode = this.#startNode;
    
      while (unvisitedNodes.size) {
        for (const [neighbourNode, neighbourCost] of this.#graph[currentNode].entries()) {
          if (neighbourCost !== 0) {
            const previousCost = costs[neighbourNode];
            const currentCost = neighbourCost + costs[currentNode];
    
            if (currentCost < previousCost) {
              costs[neighbourNode] = currentCost;
              paths[neighbourNode] = [...paths[currentNode], currentNode];
            }
          }
        }
    
        unvisitedNodes.delete(currentNode);
        currentNode = this.getCheapestNode(this.getUnvisitedNodes(costs, unvisitedNodes));
      }
    
      this.costs = costs;
      this.paths = paths;
    }
  
    getUnvisitedNodes(nodes: Nodes, unvisited: Set<number>) {
      const unvisitedNodes: Nodes = {};
      for (const [key, value] of Object.entries(nodes)) {
        if (unvisited.has(parseInt(key))) {
          unvisitedNodes[key] = value;
        }
      }
      return unvisitedNodes;
    }
    
    getCheapestNode(nodes: Nodes) {
      const minDistance = Math.min(...Object.values(nodes));
      return parseInt(Object.keys(nodes).find((key) => nodes[key] === minDistance)!);
    }
    
}

function arrayToObject(obj: Array<any>, value: any){
  return obj.reduce((acc, curr) => (acc[curr] = value, acc), {});
}
