import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import Header from './Header';
import '../styles/KanjiLayout.css';
import { kanjiFactory } from '../helpers/utils';

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

  getKanjiInCurrentOrder() {
    const ALPHABETICAL = 'Alphabetical';
    const GENKI = 'Genki';
    const GRADESCHOOL = 'Gradeschool';
    const TWITTER = 'Twitter';
    const RANDOM = 'Random';

    // This is redundant for now but replace returned expression with
    // sorting function when that's done
    switch (this.state.currentOrder) {
      case ALPHABETICAL:
        return this.state.kanjiList;
      case TWITTER:
        return this.state.kanjiList;
      default:
        return this.state.kanjiList;
    }
  }

  switchOrder(nextOrder) {
    this.setState({ currentOrder: nextOrder });
  }

  render() {
    return (
      <div className="week-container">
        <div className="top-area">
          <Header />
          <Options />
        </div>
        <KanjiContainer kanjiList={this.getKanjiInCurrentOrder()} />
      </div>
    );
  }
}

export default KanjiStore;
