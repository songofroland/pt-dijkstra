import React from 'react';
import { Frame, GraphIndex, LabeledGraph } from '../logic/commonInterfaces';
import Canvas from './Canvas';

function CanvasAnimator({ graph, frames }
  : {
    graph: LabeledGraph,
    frames: Array<Frame>,
  }) {
  return <Canvas
    nodes={graph[GraphIndex.NODES]}
    edges={graph[GraphIndex.EDGES]}
  />
}

export default CanvasAnimator;