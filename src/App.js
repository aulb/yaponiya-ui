import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KanjiStore from './components/KanjiStore';


class App extends Component {
  render() {
    return (
      <div className="App">
        <KanjiStore />
      </div>
    );
  }
}

export default App;
