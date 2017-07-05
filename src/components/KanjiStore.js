import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import { kanjiFactory } from '../helpers/utils';
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
            frequency: ORDERS.njiFactory(numOfKanji),FREQUENCY[i],
          },
        ]
      */
      kanjiMap: Immutable.Map(),
      kanjiList: kanjiFactory(numOfKanji),
      year: this.props.match.params.year || latest.year,
      month: this.props.match.params.month || latest.month,
    };

    this.switchOrder = this.switchOrder.bind(this);
  }

  // Turn map into a immutable List
  get kanjiList() {
    // Sort the kanjiList in order
    const order = this.state.currentOrder.toLowerCase();
    return this.state.kanjiList.sort((a, b) => {
      if (typeof a[order] === 'undefined') return 1;
      if (typeof b[order] === 'undefined') return 0;
      return a[order] - b[order];
    });
  }

  switchOrder(event) {
    // // Get new order from the event
    const nextOrder = event.target.value;
    this.setState({
      currentOrder: nextOrder,
    });
  }

  componentDidMount() {
    fetch('http://reblws.me:5000/api/data/nhk')
      .then(response => response.json())
      .then((response) => {
        const newKanjiList = this.state.kanjiList;
        newKanjiList.forEach((kanji) => {
          kanji.count =  response[kanji.id];
        });
        this.setState({
          kanjiList: newKanjiList,
        });
      }).catch((error) => {
        console.error(error);
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
