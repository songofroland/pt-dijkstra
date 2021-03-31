import './App.css';
import React from 'react';
import GraphEditor from './components/GraphEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GraphEditor/>
        Dijkstra is cool guy!
      </header>
    </div>
  );
}

export default App;
