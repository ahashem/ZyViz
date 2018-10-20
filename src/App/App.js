import React, { Component } from 'react';
import AppLayout from './Layout/AppLayout';
import CrossVisualizer from '../views/CrossVisualizer/CrossVisualizer';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLayout>
          <CrossVisualizer/>
        </AppLayout>
      </div>
    );
  }
}

export default App;
