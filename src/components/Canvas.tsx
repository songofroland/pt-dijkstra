import React from 'react';
import Node from './Node';
import Edge from './Edge';

interface IEdge {
  from: number;
  to: number;
};

interface ImappedNode {
  label?: string;
  id: number;
  x: number;
  y: number;
}

interface ImappedEdge {
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

function calulateNodes(
  nodes: Array<string>,
  edges: Array<IEdge>) : [Array<ImappedNode>, Array<ImappedEdge>] {
  // TODO better node placing
  const mappedNodes = nodes.map((l, i) => ({
    label: l,
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
  const mappedEdges = edges.map((obj, i) => {
    const node1 = mappedNodes.find((e) => e.id === obj?.from);
    const node2 = mappedNodes.find((e) => e.id === obj?.to);
    return {
      id: i,
      from: {
        x: node1?.x ?? 0,
        y: node1?.y ?? 0,
      },
      to: {
        x: node2?.x ?? 0,
        y: node2?.y ?? 0,
      },
    };
  });
  return [mappedNodes, mappedEdges];
}


function Canvas({nodes, edges}
  : {
    nodes: Array<string>,
    edges: Array<IEdge>
  }) {
  const [nodesToRender, edgesToRender] = calulateNodes(nodes, edges);
  const nodeComponents = nodesToRender.map((node: ImappedNode) => {
    return <Node x={node.x} y={node.y} label={node.label} key={node.id} />;
  });
  const edgeComponents = edgesToRender.map((edge: ImappedEdge) => {
    return <Edge from={edge.from} to={edge.to} key={edge.id} />;
  });
  return <div className="canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;

