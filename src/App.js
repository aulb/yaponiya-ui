import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './components/MainContainer';

const kanjiList = [
  {character:'誰', color: 'red'},
  {character:'予', color: 'blue'},
  {character:'鯨', color: 'green'},
  {character:'骨', color: 'white'},
  {character:'約', color: 'pink'},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer kanjiList={ kanjiList } />
      </div>
    );
  }
}

export default App;
