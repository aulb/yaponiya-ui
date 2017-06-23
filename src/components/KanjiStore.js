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
const styles = {
  weekContainer: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const latest = {
  year: 2017,
  month: 3,
};

class KanjiStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: OPTIONS.ALPHABETICAL,
      /* Example kanji state object
        [
          {
            id: currentChar,
            alphabetical: ORDERS.ALPHABETICAL[i],
            heisig: ORDERS.HEISIG[i],
            frequency: ORDERS.FREQUENCY[i],
          },
        ]
      */
      kanjiList: kanjiFactory(numOfKanji),
      year: this.props.match.params.year || latest.year,
      month: this.props.match.params.month || latest.month,
    };

    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
    this.updateKanji = this.updateKanji.bind(this);
  }

  updateKanji() {
    // const kanjiUpdate = { ...this.state.kanjiList };
    // const biggestCounter = getMaxCounter(mockData);
    // // TODO redo with Object.keys(mockData).map()
    // for (let character in mockData) {
    //   // Check if exist, just incase
    //   if (kanjiUpdate.hasOwnProperty(character)) {
    //     let counter = mockData[character];
    //     let colorIndex = Math.floor(counter / biggestCounter * color.length);

    //     kanjiUpdate[character].counter = counter;
    //     kanjiUpdate[character].color = color[colorIndex];
    //   }
    // }

    // this.setState({ kanjiList: kanjiUpdate });
  }

  get kanjiList() {
    // Sort the kanjiList in order
    const order = this.state.currentOrder.toLowerCase();
    return this.state.kanjiList.sort((a, b) => a[order] - b[order]);
  }

  switchOrder(event) {
    // // Get new order from the event
    const nextOrder = event.target.value;
    this.setState({
      currentOrder: nextOrder,
    });
  }

  render() {
    const dateString = `
      Year: ${this.state.year} Month: ${this.state.month}
    `;
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
        <KanjiContainer
          kanjiList={this.kanjiList}
          numOfKanji={numOfKanji}
        />
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
  }).isRequired,
};

export default KanjiStore;
