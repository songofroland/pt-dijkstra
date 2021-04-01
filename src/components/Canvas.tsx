import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { MappedNode, MappedEdge } from '../logic/commonInterfaces';



function Canvas({mappedNodes, mappedEdges}
  : {
    mappedNodes: Array<MappedNode>,
    mappedEdges: Array<MappedEdge>,
  }) {
  let edgeComponents, nodeComponents;
  if (mappedNodes.length) {
    nodeComponents = mappedNodes.map((node: MappedNode) =>
      <Node x={node.x} y={node.y} label={node.label} key={node.id} />,
    );
    edgeComponents = mappedEdges.map((edge: MappedEdge) =>
      <Edge from={edge.from} to={edge.to} key={edge.id} />,
    );
  }
  return <div className="canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;
