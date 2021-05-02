import { DissasembledGraph, Graph, Edge } from './commonInterfaces';

export default function dissasembleGraph(graph: Graph): DissasembledGraph {
  const nodes = getNodesArray(graph);
  const edges = getEdgesArray(graph);
  return [nodes, edges];
}

export function getNodesArray(graph: Graph): Array<number> {
  //const labels = labelGen();
  return [];
  //return Array.from({ length: graph.length }, () => labels.next().value);
}

/**
 * Finds all edges in graph matrix. This may be inefficient (complexity
 * of O(n^3)), but for this purpose it's ok. Tested up to 2016 edges.
 * For that amount takes < 1s. May be a bottleneck in the future.
 */
export function getEdgesArray(graph: Graph): Array<Edge> {
  const edges: Set<Edge> = new Set();

  const isDuplicate = (edge: Edge) => {
    for (const e of edges) {
      if (e.equals(edge)) return true;
    }
    return false;
  };

  for (let from = 0; from < graph.length; from++) {
    for (let to = 0; to < graph[from].length; to++) {
      const edge = new Edge(from, to);
      if (edge.from !== edge.to && !isDuplicate(edge)) {
        edges.add(edge);
      }
    }
  }
  return Array.from(edges);
}
