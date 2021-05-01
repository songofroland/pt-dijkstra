import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { MappedNode, MappedEdge } from '../logic/commonInterfaces';



function Canvas({nodes, edges}
  : {
    nodes: Array<MappedNode>,
    edges: Array<MappedEdge>,
  })
{
  let edgeComponents, nodeComponents;
  if (nodes.length) {
    nodeComponents = nodes.map((node: MappedNode) =>
      <Node x={node.x} y={node.y} label={node.label} key={node.id} />,
    );
    edgeComponents = edges.map((edge: MappedEdge) =>
      <Edge from={edge.from} to={edge.to} key={edge.id} />,
    );
  }
  return <div className="canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;
