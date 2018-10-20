import React, { Component } from 'react';
import './App.scss';
import CrossVisualizer from './CrossVisualizer/CrossVisualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          ZyViz
        </header>
        <div>
          <CrossVisualizer>
          </CrossVisualizer>
        </div>
      </div>
    );
  }
}

export default App;
