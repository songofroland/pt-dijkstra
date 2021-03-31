import './App.css';
import React from 'react';
import GraphEditor from './components/GraphEditor';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GraphEditor/>
        Dijkstra is cool guy!
        <Canvas nodes={['A', 'B']} edges={[{from: 0, to: 1}]}/>
      </header>
    </div>
  );
}

export default App;
