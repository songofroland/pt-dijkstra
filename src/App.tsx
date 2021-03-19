import './App.css';
import React from 'react';
import Canvas from './component/Canvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Dijkstra is cool guy!
        <Canvas nodes={['A', 'B']} edges={[{from: 0, to: 1}]}/>
      </header>
    </div>
  );
}

export default App;
