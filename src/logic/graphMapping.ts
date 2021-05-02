import { Graph, MappedEdge, MappedNode, Edge } from './commonInterfaces';

const LABEL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


export default function mapGraph(graph: Graph):
  [Array<MappedNode>, Array<MappedEdge>]
{
  const nodes = getNodesArray(graph);
  const edges = getEdgesArray(graph);
  return calulateNodes(nodes, edges);
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
      const edge = new Edge(from, to, graph[from][to]);
      if (edge.label !== 0 && edge.from !== edge.to && !isDuplicate(edge)) {
        edges.add(edge);
      }
    }
  }
  return Array.from(edges);
}

/**
 * Generates labels A ... Z then AA ... ZZ then AAA ... ZZZ and so on.
 */
export function* labelGen(): Generator<string> {
  const alphabet = LABEL_ALPHABET.split('');

  const incrementDigit = (digit: string): [string, boolean] => {
    let lastDigitInAlphabet = alphabet[alphabet.length - 1];
    if (digit === lastDigitInAlphabet) {
      return [alphabet[0], true];
    }
    let nextDigit = alphabet[alphabet.indexOf(digit) + 1];
    return [nextDigit, false];
  };

  const increment = (nonDecimalNumber: string) => {
    let digits = nonDecimalNumber.split('')
    let carry = true;
    for (let i = digits.length - 1; i >= 0; i--) {
      if (!carry) break;
      [digits[i], carry] = incrementDigit(digits[i]);
    }
    if (carry) {
      digits = [alphabet[0]].concat(digits);
    }
    return digits.join('');
  };

  let current = alphabet[0];
  while (true) {
    yield current;
    current = increment(current);
  }
}

function getNodesArray(graph: Graph): Array<string> {
  const labels = labelGen();
  return Array.from({ length: graph.length }, () => labels.next().value);
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
