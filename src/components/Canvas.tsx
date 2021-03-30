import React from 'react';
import Node from './Node';
import Edge from './Edge';

interface IEdge {
  from: number;
  to: number;
};

interface MappedNode {
  label?: string;
  id: number;
  x: number;
  y: number;
}

interface MappedEdge {
  id: number;
  from: {
    x: number,
    y: number,
  };
  to: {
    x: number,
    y: number,
  };
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


function Canvas({nodes, edges}
  : {
    nodes: Array<string>,
    edges: Array<IEdge>,
  }) {
  const [nodesToRender, edgesToRender] = calulateNodes(nodes, edges);
  const nodeComponents = nodesToRender.map((node: MappedNode) =>
    <Node x={node.x} y={node.y} label={node.label} key={node.id} />
  );
  const edgeComponents = edgesToRender.map((edge: MappedEdge) =>
    <Edge from={edge.from} to={edge.to} key={edge.id} />
  );
  return <div className="canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;
