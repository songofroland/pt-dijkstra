import {
  MappedEdge, 
  MappedNode,
  Edge,
  MappedGraph,
  GraphIndex,
  DisassembledGraph,
} from './commonInterfaces';
const rand = require('random-seed');


export default function mapGraph(graph: DisassembledGraph): MappedGraph {
  return calcNodes(graph[GraphIndex.NODES], graph[GraphIndex.EDGES]);
}

function* typedGenerator(seed: string) : Generator<number> {
  const gen = new rand(seed);
  while (true) {
    yield gen.random();
  }
}

function calcNodes(nodes: Array<number>, edges: Array<Edge>):
  [Array<MappedNode>, Array<MappedEdge>]
{
  const seed = nodes.toString() + edges.toString();
  const gen = typedGenerator(seed);

  // TODO better node placing
  const mappedNodes = nodes.map((l, i) => ({
    id: i,
    x: gen.next().value * 100,
    y: gen.next().value * 100,
  }));
  const mappedEdges = edges.map((edge: Edge, i) => {
    const defaultNode = { x: 0, y: 0 };
    const node1 = mappedNodes.find((e) => e.id === edge.from) ?? defaultNode;
    const node2 = mappedNodes.find((e) => e.id === edge.to) ?? defaultNode;
    return {
      id: i,
      label: edge.label,
      from: { x: node1.x, y: node1.y },
      to: { x: node2.x, y: node2.y },
    };
  });
  return [mappedNodes, mappedEdges];
}
