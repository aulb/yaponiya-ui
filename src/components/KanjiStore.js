import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import { kanjiFactory, getMaxCounter } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';
import { color } from '../helpers/colors';
import { mockData } from '../helpers/mock';

/* Determine the character's color and initial counter
 * in the kanjiFactory.
 */
const numOfKanji = 2136;
const KANJI_LIST = kanjiFactory(numOfKanji);
const styles = {
  weekContainer: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

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
      kanjiMap: KANJI_LIST,
      currentYear: 2017,
      currentMonth: 6,
      // mode: 'NHKEasy'
    };

    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
    this.updateKanji = this.updateKanji.bind(this);
  }


  componentDidMount() {
    this.updateKanji();
  }

  componentWillMount() {
    this.setState({
      currentYear: this.props.match.params.year,
      currentMonth: this.props.match.params.month,
    });
  }

  updateKanji() {
    const kanjiUpdate = {...this.state.kanjiMap};
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

    this.setState({ kanjiMap: kanjiUpdate });
  }

  get kanjiMap() {
    return this.state.kanjiMap;
  }

  switchOrder(event) {
    // Get new order from the event
    const nextOrder = event.target.value;

    // Create new set of kanjiMap with their order changed
    // This changes the position state of each kanji
    const updatedKanji = kanjiFactory(numOfKanji, nextOrder);

    const newKanjiList = this.kanjiMap;

    // Need to carry over the color and counter
    Object.keys(this.kanjiMap)
      .filter(char => updatedKanji[char])
      .forEach((char) => {
        newKanjiList[char] = Object.assign(
          {},
          newKanjiList[char],
          { position: updatedKanji[char].position },
        );
      });

    this.setState({
      currentOrder: nextOrder,
      kanjiMap: newKanjiList,
    });
  }

  renderKanjiContainer() {
    return (
      <KanjiContainer
        kanjiList={this.kanjiMap}
        numOfKanji={numOfKanji}
      />
    );
  }

  render() {
    const renderKanjiContainer = this.renderKanjiContainer();
    const dateString = this.props.match
      ? `Year: ${this.state.currentYear} Month: ${this.state.currentMonth}`
      : 'Default';
    return (
      <div style={styles.weekContainer}>
        <h2>
          { dateString }
        </h2>
        <Options
          currentOrder={this.state.currentOrder}
          switchOrder={this.switchOrder}
          possibleOptions={OPTIONS}
        />
        { renderKanjiContainer }
      </div>
    );
  }
}

KanjiStore.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
    }),
  }),
};

export default KanjiStore;
