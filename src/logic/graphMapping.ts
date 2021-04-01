
import { Graph, MappedEdge, MappedNode } from './commonInterfaces';

interface IEdge {
  from: number;
  to: number;
};

export default function mapGraph(graph: Graph):
  [Array<MappedNode>, Array<MappedEdge>]
{
  const nodes = ['A', 'B'];
  const edges = [{ from: 0, to: 1 }];
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
