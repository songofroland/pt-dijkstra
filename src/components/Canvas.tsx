import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { LabeledNode, LabeledEdge } from '../logic/commonInterfaces';



function Canvas({nodes, edges}
  : {
    nodes: Array<LabeledNode>,
    edges: Array<LabeledEdge>,
  })
{
  let edgeComponents, nodeComponents;
  if (nodes.length) {
    nodeComponents = nodes.map( node =>
      <Node x={node.x} y={node.y} label={node.label} key={node.id} />,
    );
    edgeComponents = edges.map( edge =>
      <Edge from={edge.from} to={edge.to} key={edge.id} />,
    );
  }
  return <div className="canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;
