import './App.css';
import React from 'react';
import GraphEditor from './components/GraphEditor';
import Canvas from './components/Canvas';

function App() {
  const editorCallback = (graph: any) => console.log(graph)
  return (
    <div className="app">
      Dijkstra is cool guy!
      <Canvas nodes={['A', 'B']} edges={[{from: 0, to: 1}]}/>
      <GraphEditor onRender={editorCallback}/>
    </div>
  );
}

export default App;
