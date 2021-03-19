import React from 'react';
import Node from './Node';
import Edge from './Edge';

function Canvas() {
  return <div className="Canvas">
    <Node x={50} y={50} />
    <Node x={30} y={30} label={'A'}/>
    <Edge position={{x: 0, y: 0, len: 141, rot: 45}}/>
  </div>;
}

export default Canvas;
