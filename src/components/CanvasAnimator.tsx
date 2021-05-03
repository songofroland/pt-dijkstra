import React, { useEffect, useState } from 'react';
import { Frame, GraphIndex, LabeledGraph } from '../logic/commonInterfaces';
import Canvas from './Canvas';

const MS_PER_FRAME = 1000

function CanvasAnimator({ graph, frames }
  : {
    graph: LabeledGraph,
    frames: Array<Frame>,
  }) {
  const [animation, setAnimation] = useState({
    started: true,
    frameNum: 0,
  });

  useEffect(() => {
    if (animation.started) {
      setTimeout(() => {
        let nextFrame = animation.frameNum + 1;
        if (nextFrame === frames.length) {
          nextFrame = 0;
        }
        setAnimation({ ...animation, frameNum: nextFrame });
      }, MS_PER_FRAME);
    }
  });

  return <>
    <Canvas
      nodes={graph[GraphIndex.NODES]}
      edges={graph[GraphIndex.EDGES]}
      frame={frames[animation.frameNum]} />
  </>
}

export default CanvasAnimator;
