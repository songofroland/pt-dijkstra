import React from 'react';
import Node from './Node';
import Edge from './Edge';

function Canvas() {
  return <div className="Canvas">
    <Node x={50} y={50} />
    <Node x={30} y={30} label={'A'}/>
    <Edge position={{x: 20, y: 20, len: 30, rot: 20}}/>
  </div>;
}

export default Canvas;
