import React, { useEffect, useState } from 'react';
import { Frame, GraphIndex, LabeledGraph } from '../logic/commonInterfaces';
import Canvas from './Canvas';

const MS_PER_FRAME = 1000;

function CanvasAnimator({ graph, frames }
  : {
    graph: LabeledGraph,
    frames: Array<Frame>,
  }) {
  const [frameNum, setFrameNum] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let nextFrame = frameNum + 1;
      if (nextFrame === frames.length) {
        nextFrame = 0;
      }
      setFrameNum(nextFrame);
    }, MS_PER_FRAME);
  });

  return <>
    <Canvas
      nodes={graph[GraphIndex.NODES]}
      edges={graph[GraphIndex.EDGES]}
      frame={frames[frameNum]} />
  </>;
}

export default CanvasAnimator;
