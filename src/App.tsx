import './App.css';
import React from 'react';
import GraphEditor from './components/GraphEditor';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="app">
      Dijkstra is cool guy!
      <Canvas nodes={['A', 'B']} edges={[{from: 0, to: 1}]}/>
      <GraphEditor/>
    </div>
  );
}

export default App;
