import React, { Component } from 'react';
import Fills from './Fills';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Coinfolio</h1>
        </header>
        <Fills/>
      </div>
    );
  }
}

export default App;
