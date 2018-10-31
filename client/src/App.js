import React, { Component } from 'react';
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hypertube</h1>
        <Navbar />
      </div>
    );
  }
}

export default App;
