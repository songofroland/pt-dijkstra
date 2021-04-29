import './App.css';
import React from 'react';
import GraphEditor from './components/GraphEditor';
import Canvas from './components/Canvas';
import mapGraph from './logic/graphMapping';
import { Graph } from './logic/commonInterfaces';
import { useState } from 'react';
import samples from './logic/graphSamples';

function App() {
  const [mappedGraph, setMappedGraph] = useState({
    graph: mapGraph(samples.simple.graph), //TODO handle initial state better
    path: [],
  });

  const editorCallback = (graph: Graph) => {
    setMappedGraph({
      graph: mapGraph(graph),
      path: [],
    });
  };

  return (
    <div className="app">
      <h1>Dijkstra is cool guy!</h1>
      <Canvas
        nodes={mappedGraph.graph[0]}
        edges={mappedGraph.graph[1]} />
      <GraphEditor onRender={editorCallback}/>
    </div>
  );
}

export default App;
