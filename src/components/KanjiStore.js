import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import Header from './Header';
import '../styles/KanjiLayout.css';
import { kanjiFactory, getMaxCounter } from '../helpers/utils';
import { OPTIONS, ORDERS } from '../helpers/constants';
import { color } from '../helpers/colors';
import { mockData } from '../helpers/mock';

/* Determine the character's color and initial counter
 * in the kanjiFactory.
 */
const numOfKanji = 200;
const KANJI_LIST = kanjiFactory(numOfKanji);

class KanjiStore extends Component {
  constructor(props) {
    super(props); // What does this do? <-- lets you call this.props in constructor
    this.state = {
      currentOrder: OPTIONS.ALPHABETICAL,
      /* Example kanji state object
        {
          '日': {
            color    : '#FFF',
            counter  : 0,
            position : 0,
          },
          '大',...
        }
      */
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
    // TODO redo with Object.keys(mockData).map()
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
    // Get new order from the event
    const nextOrder = event.target.value;

    // Create new set of kanjiList with their order changed
    // This changes the position state of each kanji
    const kanjiUpdate = kanjiFactory(numOfKanji, nextOrder);

    // TODO Copy counter values to the new kanji states
    // This should be from mockData
    // Object.keys(this.props.kanjiList).map((character) => {
    //   // Update only if the character exist in the new state
    //   if (kanjiUpdate.hasOwnProperty(character)) {
    //       kanjiUpdate[character].counter = this.props.kanjiList
    //   }
    // });

    console.log(kanjiUpdate);
    this.setState({
      currentOrder: nextOrder,
      kanjiList: kanjiUpdate,
    });
  }

  renderKanjiContainer() {
    return (
      <KanjiContainer
        kanjiList = {this.kanjiList}
        numOfKanji={numOfKanji}
      />
    );
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
