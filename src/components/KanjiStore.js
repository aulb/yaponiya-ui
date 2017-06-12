import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import Header from './Header';
import '../styles/KanjiLayout.css';
import { kanjiFactory } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';

const KANJI_LIST = kanjiFactory(300);

class KanjiStore extends Component {
  constructor(props) {
    super(props); // What does this do? <-- lets you call this.props in constructor
    this.state = {
      currentOrder: '',
      kanjiList: KANJI_LIST,
    };

    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
  }

  get kanjiList() {
    return this.state.kanjiList;
  }

  switchOrder(event) {
    const nextOrder = event.target.value;
    this.setState({ currentOrder: nextOrder });
  }

  render() {
    return (
      <div className="week-container">
        <div className="top-area">
          <Header />
          <Options
            currentOrder={this.state.currentOrder}
            switchOrder={this.switchOrder}
            possibleOptions={OPTIONS}
          />
        </div>
        <KanjiContainer kanjiList={this.kanjiList} />
      </div>
    );
  }
}

export default KanjiStore;
