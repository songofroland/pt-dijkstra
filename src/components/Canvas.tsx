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
  const nodeComponents = nodes.map( node =>
    <Node x={node.x} y={node.y} label={node.label} key={node.id} />,
  );
  const edgeComponents = edges.map( (edge, id) =>
    <Edge 
      from={edge.from} 
      to={edge.to} 
      key={edge.id} 
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
