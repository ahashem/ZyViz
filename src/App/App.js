import React, { Component } from 'react';
import AppLayout from './Layout/AppLayout';

import './App.scss';
import AppRouter from '../AppRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLayout>
          <AppRouter/>
        </AppLayout>
      </div>
    );
  }
}

export default App;
