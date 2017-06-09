import React, { Component } from 'react';
import './styles/App.css';
import './styles/KanjiLayout.css';
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
