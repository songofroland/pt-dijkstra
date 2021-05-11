import {
  GraphIndex,
  MappedGraph,
  MappedEdge,
  MappedNode,
  LabeledGraph,
  LabeledEdge,
  LabeledNode,
} from './commonInterfaces';

const LABEL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function labelGraph(graph: MappedGraph): LabeledGraph {
  return [
    labelNodes(graph[GraphIndex.NODES]),
    labelEdges(graph[GraphIndex.EDGES]),
  ];
}

function labelEdges(edges: Array<MappedEdge>): Array<LabeledEdge> {
  return edges.map(edge => { return { ...edge, label: '' }; });
  //TODO place weights as labels
}

function labelNodes(nodes: Array<MappedNode>): Array<LabeledNode> {
  const labels = labelGen();
  return nodes.map(node => { return { ...node, label: labels.next().value }; });
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
    let digits = nonDecimalNumber.split('');
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
