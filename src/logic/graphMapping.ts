
import { Graph, MappedEdge, MappedNode } from './commonInterfaces';

const LABEL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Edge {
  label?: number;
  from: number;
  to: number;
  equals = (other: Edge) => {
    return this.label === other.label && (
      (this.from === other.from && this.to === other.to) ||
      (this.from === other.to && this.to === other.from)
    )
  };
  constructor(from: number, to: number, label?: number) {
    this.from = from;
    this.to = to;
    this.label = label;
  }
};

/**
 * Finds all edges in graph matrix. It maybe inefficient (complexity of
 * O(n^3)), but for this purpose it's ok. Tested up to 2016 edges. For
 * that amount takes < 1s. Maybe a bottleneck in the future.
 */
function getEdgesArray(graph: Graph): Array<Edge> {
  const edges: Set<Edge> = new Set();
  const isAccounted = (edge: Edge) => {
    for (const e of edges) {
      if (e.equals(edge)) {
        return true;
      }
    }
    return false;
  }
  for (let from = 0; from < graph.length; from++) {
    for (let to = 0; to < graph[from].length; to++) {
      const edge = new Edge(from, to, graph[from][to])
      if (edge.label !== 0 && edge.from !== edge.to && !isAccounted(edge)) {
        edges.add(edge);
      }
    }
  }
  return Array.from(edges);
}

/**
 * Generates labels A ... Z then AA ... ZZ then AAA ... ZZZ and so on.
 */
function* labelGen(): Generator<string> {
  const alphabet = LABEL_ALPHABET.split('');
  const incrementDigit = (digit: string): [string, boolean] => {
    const digitIndex = alphabet.indexOf(digit);
    if (digitIndex === alphabet.length - 1) {
      return [alphabet[0], true];
    }
    return [alphabet[digitIndex + 1], false];
  }
  const increment = (nonDecimal: Array<string>) => {
    let workIndex = nonDecimal.length - 1;
    let carry = true;
    while (carry) {
      if (workIndex === -1) {
        nonDecimal = [alphabet[0]].concat(nonDecimal);
        break;
      }
      const [newDigit, newCarry] = incrementDigit(nonDecimal[workIndex]);
      carry = newCarry;
      nonDecimal[workIndex] = newDigit;
      workIndex--;
    }
    return nonDecimal
  }
  let current = 'A';
  while (true) {
    yield current;
    current = increment(current.split('')).join('');
  }
}

function getNodesArray(graph: Graph): Array<string> {
  const labels = labelGen();
  return Array.from({ length: graph.length }, () => labels.next().value);
}

export default function mapGraph(graph: Graph):
  [Array<MappedNode>, Array<MappedEdge>]
{
  const nodes = getNodesArray(graph);
  const edges = getEdgesArray(graph);
  console.log('Final edge array', edges, 'for graph', graph);
  return calulateNodes(nodes, edges);
}

function calulateNodes(nodes: Array<string>, edges: Array<Edge>):
  [Array<MappedNode>, Array<MappedEdge>]
{
  // TODO better node placing
  const mappedNodes = nodes.map((l, i) => ({
    label: l,
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
  const mappedEdges = edges.map((obj: Edge, i) => {
    const defaultNode = { x: 0, y: 0 };
    const node1 = mappedNodes.find((e) => e.id === obj.from) ?? defaultNode;
    const node2 = mappedNodes.find((e) => e.id === obj.to) ?? defaultNode;
    return {
      id: i,
      from: { x: node1.x, y: node1.y },
      to: { x: node2.x, y: node2.y },
    };
  });
  return [mappedNodes, mappedEdges];
}
