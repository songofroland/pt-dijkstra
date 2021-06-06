import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { LabeledNode, LabeledEdge, Frame } from '../logic/commonInterfaces';



function Canvas({ nodes, edges, frame }
  : {
    nodes: Array<LabeledNode>,
    edges: Array<LabeledEdge>,
    frame: Frame,
  }) {
  const WAS_PROCESSED_COLOR = 'blue';
  const CURRENT_COLOR = 'red';
  const DEFAULT_COLOR = 'white';

  const getBgColor = (isCurrent: boolean, wasProcessed: boolean) => {
    if (isCurrent) return CURRENT_COLOR;
    if (wasProcessed) return WAS_PROCESSED_COLOR;
    return DEFAULT_COLOR;
  };

  const nodeComponents = nodes.map((node, id) =>
    <Node x={node.x}
      y={node.y}
      label={node.label}
      key={id}
      bgColor={getBgColor(frame.currentNode === id, frame.visitedNodes.includes(id))}
    />,
  );
  
  const edgeComponents = edges.map((edge, id) =>
    <Edge
      from={edge.from}
      to={edge.to}
      key={id}
      label={edge.label}
      bgColor={getBgColor(frame.currentEdges.includes(id), frame.processedEdges.includes(id))}
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
