import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import { kanjiFactory, getMaxCounter } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';

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

    this.switchOrder = this.switchOrder.bind(this);
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
