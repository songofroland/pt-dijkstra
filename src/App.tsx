import './App.css';
import React from 'react';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Dijkstra is cool guy!
        <Canvas nodes={['A', 'B']} edges={[{from: 0, to: 1}]}/>
      </header>
    </div>
  );
}

export default App;
