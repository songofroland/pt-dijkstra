import './App.css';
import React from 'react';
import { useState } from 'react';

import GraphEditor from './components/GraphEditor';
import CanvasAnimator from './components/CanvasAnimator';

import { Graph } from './logic/commonInterfaces';
import samples from './data/graphSamples';
import disassembleGraph from './logic/graphDisassembling';
import createFrames from './logic/graphFrames';
import mapGraph from './logic/graphMapping';
import labelGraph from './logic/graphLabeling';
import { DijkstraTracer } from './logic/dijkstra';
import Description from './components/Description';


const processGraph = (graph: Graph) => {
  const disassembledGraph = disassembleGraph(graph);
  const frames = createFrames(disassembledGraph, new DijkstraTracer(graph));
  return {
    graph: labelGraph(mapGraph(disassembledGraph)),
    frames: frames,
  };
};

function App() {
  const [parsedGraph, setParsedGraph] = useState(processGraph(samples.simple.graph));

  const editorCallback = (graph: Graph) => setParsedGraph(processGraph(graph));

  return <>
    <div className="app">
      <h1>Dijkstra is cool guy!</h1>
      <main>
        <CanvasAnimator
          graph={parsedGraph.graph}
          frames={parsedGraph.frames} />
        <Description />
        <GraphEditor onRender={editorCallback} />
      </main>
    </div>
  </>;
}

export default App;
