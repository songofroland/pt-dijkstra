import { Graph } from './commonInterfaces';

interface Costs {
    [key: number]: number
}

interface Paths {
    [key: number]: Array<number>
}

interface TraversalRecord {
  node: number,
  lookups: Array<number>
}

export class DijkstraTracer{
    costs: Costs;
    paths: Paths;
    traversalHistory: Array<TraversalRecord>;
    #graph: Graph;
    #startNode: number;
    
    constructor(graph: Graph, startNode: number = 0) {
      this.#graph = graph;
      this.#startNode = startNode;
      this.traversalHistory = [];
      this.costs = {};
      this.paths = {};
      this._setCostsPathsAndTraversalHistory();
    }

    _setCostsPathsAndTraversalHistory() {
      const nodes = Array.from(Array(this.#graph.length).keys());
      const unvisitedNodes = new Set(nodes);
      const paths: Paths = arrayToObject(nodes, []);
      const costs: Costs = arrayToObject(nodes, Infinity);
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
        
        this.traversalHistory.push(this.getTraversalFor(currentNode));
        unvisitedNodes.delete(currentNode);
        currentNode = getKeyOfMinValue(filterObject(costs, unvisitedNodes));
      }
    
      this.costs = costs;
      this.paths = paths;
    }
  
    getTraversalFor(node: number): TraversalRecord {
      return {
        node: node,
        lookups: this.#graph[node].flatMap((cost, node) => cost === 0 ? []: node),
      }
    }
    
}

function filterObject(nodes: Costs, allowedKeys: Set<number>): Costs {
  const result: Costs = {};
  for (const [key, value] of Object.entries(nodes)) {
    if (allowedKeys.has(parseInt(key))) {
      result[parseInt(key)] = value;
    }
  }
  return result;
}

function getKeyOfMinValue(obj: Costs): number {
  const minValue = Math.min(...Object.values(obj));
  return parseInt(Object.keys(obj).find((key) => obj[parseInt(key)] === minValue)!);
}

function arrayToObject(arr: Array<any>, defaultValue: any): any{
  return arr.reduce((acc, curr) => (acc[curr] = defaultValue, acc), {});
}
