import './App.css';
import React from 'react';
import { useState } from 'react';

import GraphEditor from './components/GraphEditor';
import CanvasAnimator from './components/CanvasAnimator';

import { Graph } from './logic/commonInterfaces';
import samples from './logic/graphSamples';
import disassembleGraph from './logic/graphDisassembling';
import createFrames from './logic/graphFrames';
import mapGraph from './logic/graphMapping';
import labelGraph from './logic/graphLabeling';
import { DijkstraTracer } from './logic/dijkstra';

function App() {
  const processGraph = (graph: Graph) => {
    const disassembledGraph = disassembleGraph(graph);
    const frames = createFrames(disassembledGraph, new DijkstraTracer(graph));
    return {
      graph: labelGraph(mapGraph(disassembledGraph)),
      frames: frames,
    };
  };

  const [processedGraph, setProcessedGraph] =
    useState(processGraph(samples.simple.graph));

  const editorCallback = (graph: Graph) => {
    setProcessedGraph(processGraph(graph));
  };

  return (
    <div className="app">
      <h1>Dijkstra is cool guy!</h1>
      <CanvasAnimator
        graph={processedGraph.graph}
        frames={processedGraph.frames} />
      <GraphEditor onRender={editorCallback}/>
    </div>
  );
}

export default App;
