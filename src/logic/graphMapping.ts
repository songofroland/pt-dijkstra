import {
  MappedEdge, 
  MappedNode,
  Edge,
  MappedGraph,
  GraphIndex,
  DissasembledGraph,
} from './commonInterfaces';


export default function mapGraph(graph: DissasembledGraph): MappedGraph {
  return calcNodes(graph[GraphIndex.NODES], graph[GraphIndex.EDGES]);
}

function calcNodes(nodes: Array<number>, edges: Array<Edge>):
  [Array<MappedNode>, Array<MappedEdge>]
{
  // TODO better node placing
  const mappedNodes = nodes.map((l, i) => ({
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
