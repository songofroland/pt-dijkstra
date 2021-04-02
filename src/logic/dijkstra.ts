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
    traversalHistory: Array<{node: number, lookups: Array<number>}>;
    #graph: Graph;
    #startNode: number;
    
    constructor(graph: Graph, startNode: number = 0) {
      this.#graph = graph;
      this.#startNode = startNode;
      this.traversalHistory = [];
      this.costs = {};
      this.paths = {};
      this.setCostsPathsAndTraversalOrder();
    }

    setCostsPathsAndTraversalOrder() {
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
        
        this.traversalHistory.push(this._getTraversalFor(currentNode));
        unvisitedNodes.delete(currentNode);
        currentNode = getKeyOfMinValue(filterObject(costs, unvisitedNodes));
      }
    
      this.costs = costs;
      this.paths = paths;
    }
  
    _getTraversalFor(node: number){
      return {
        node: node,
        lookups: this.#graph[node].flatMap((cost, node) => cost === 0 ? []: node),
      }
    }
    
}

function filterObject(nodes: Nodes, allowedKeys: Set<number>): Nodes {
  const result: Nodes = {};
  for (const [key, value] of Object.entries(nodes)) {
    if (allowedKeys.has(parseInt(key))) {
      result[key] = value;
    }
  }
  return result;
}

function getKeyOfMinValue(obj: Nodes): number {
  const minValue = Math.min(...Object.values(obj));
  return parseInt(Object.keys(obj).find((key) => obj[key] === minValue)!);
}

function arrayToObject(obj: Array<any>, defaultValue: any){
  return obj.reduce((acc, curr) => (acc[curr] = defaultValue, acc), {});
}
