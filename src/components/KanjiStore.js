import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import kanjiFactory from '../helpers/kanjifactory';

const KANJI_LIST = kanjiFactory(100);

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
    const ALPHABET = 'Alphabetical';
    const TWITTER = 'Twitter';

    // This is redundant for now but replace returned expression with
    // sorting function when that's done
    switch (this.state.currentOrder) {
      case ALPHABET:
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
        <KanjiContainer kanjiList={this.getKanjiInCurrentOrder()} />
      </div>
    );
  }
}

export default KanjiStore;
