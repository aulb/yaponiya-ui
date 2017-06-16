import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import Header from './Header';
import '../styles/KanjiLayout.css';
import { kanjiFactory, getMaxCounter } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';
import { color } from '../helpers/colors';
import { mockData } from '../helpers/mock';

/* Determine the character's color and initial counter
 * in the kanjiFactory.
 */
const KANJI_LIST = kanjiFactory(200);

class KanjiStore extends Component {
  constructor(props) {
    super(props); // What does this do? <-- lets you call this.props in constructor
    this.state = {
      currentOrder: 'Alphabetical',
      kanjiList: KANJI_LIST,
    };

    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
    this.updateKanji = this.updateKanji.bind(this);
  }

  componentDidMount() {
    this.updateKanji();
  }

  updateKanji() {
    const kanjiUpdate = {...this.state.kanjiList};
    const biggestCounter = getMaxCounter(mockData);
    for (let character in mockData) {
      // Check if exist, just incase
      if (kanjiUpdate.hasOwnProperty(character)) {
        let counter = mockData[character];
        let colorIndex = Math.floor(counter / biggestCounter * color.length);

        kanjiUpdate[character].counter = counter;
        kanjiUpdate[character].color = color[colorIndex];
      }
    }

    this.setState({ kanjiList: kanjiUpdate });
  }

  get kanjiList() {
    return this.state.kanjiList;
  }

  switchOrder(event) {
    const nextOrder = event.target.value;
    this.setState({ currentOrder: nextOrder });
  }

  renderKanjiContainer() {
    return <KanjiContainer kanjiList={this.kanjiList} />;
  }

  render() {
    const renderKanjiContainer = this.renderKanjiContainer();
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
        { renderKanjiContainer }
      </div>
    );
  }
}

export default KanjiStore;
