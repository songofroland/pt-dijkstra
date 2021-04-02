
import { Graph, MappedEdge, MappedNode } from './commonInterfaces';

const LABEL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface IEdge {
  label?: string;
  from: number;
  to: number;
};

function getEdgesArray(graph: Graph): Array<IEdge> { //BUG HERE
  const edges: Set<IEdge> = new Set();
  for (let from = 0; from < graph.length; from++) {
    for (let to = 0; to < graph[from].length; to++) {
      const edge = graph[from][to];
      if (edge !== 0 && from < to) {
        edges.add({
          label: edge.toString(),
          from: from,
          to: to,
        });
      }
    }
  }
  return Array.from(edges);
}

function* labelGen(): Generator<string> {
  const alphabet = LABEL_ALPHABET.split('');
  while (true) {
    for (const letter of alphabet) {
      yield letter;
    }
  }
  //TODO yield AA .. ZZ and AAA ... ZZZ if needed
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
  return calulateNodes(nodes, edges);
}

function calulateNodes(nodes: Array<string>, edges: Array<IEdge>):
  [Array<MappedNode>, Array<MappedEdge>]
{
  // TODO better node placing
  const mappedNodes = nodes.map((l, i) => ({
    label: l,
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
  const mappedEdges = edges.map((obj: IEdge, i) => {
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
