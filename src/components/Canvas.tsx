import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { LabeledNode, LabeledEdge, Frame } from '../logic/commonInterfaces';



function Canvas({nodes, edges, frame}
  : {
    nodes: Array<LabeledNode>,
    edges: Array<LabeledEdge>,
    frame: Frame,
  })
{
  const nodeComponents = nodes.map( (node, id) =>
    <Node x={node.x} y={node.y} label={node.label} key={id} />,
  );
  const edgeComponents = edges.map( (edge, id) =>
    <Edge 
      from={edge.from} 
      to={edge.to} 
      key={id} 
      label={edge.label} 
      isCurrent={frame.currentEdges.includes(id)} 
      isActive={frame.activeEdges.includes(id)}
    />,
  );
  

  return <>
    <div className="canvas">
      {edgeComponents}
      {nodeComponents}
    </div>
  </>;
}

export default Canvas;
