import React, { Component } from 'react';
import Immutable from 'immutable';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import io from 'socket.io-client';
import { kanjiFactory } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';


const socket = io('http://reblws.me:8080');
const numOfKanji = 2136;
const styles = {
  weekContainer: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
const uri = 'http://reblws.me:8080';
const socketOptions = { transports: ['websocket'] };

class KanjiStore extends Component {
  constructor(props, context) {
    super(props, context);
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
      kanjiMap: Immutable.Map(kanjiFactory(2136)),
      // kanjiList: kanjiFactory(numOfKanji),
      tweetFlash: [],
    };
    this.switchOrder = this.switchOrder.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }


  componentDidMount() {
    socket.on('tweet', data => this.handleTweet(data));

    fetch('http://reblws.me:5000/api/data/nhk')
      .then(response => response.json())
      .then((response) => {
        let kanjiMap = this.state.kanjiMap;

        Object.keys(response).forEach((key) => {
          if (typeof this.state.kanjiMap.get(key) === 'object') {
            const newKanji = this.state.kanjiMap.get(key).set('count', response[key]);
            kanjiMap = kanjiMap.set(key, newKanji);
          }
        });

        return kanjiMap;
      }).then((kanjiMap) => {
        this.setState({
          kanjiMap,
        });
      });
  }

  handleTweet(tweet) {
    this.setState({ tweetFlash: tweet });
  }

  switchOrder(event) {
    // // Get new order from the event
    const nextOrder = event.target.value;
    this.setState({
      currentOrder: nextOrder,
    });
  }

  get kanjiList() {
    // Sort the kanjiList in order
    const kanjiMap = this.state.kanjiMap;
    const kanjiList = kanjiMap.keySeq()
      .map(key => Immutable.Map({
        id: [key],
        count: kanjiMap.get(key).get('count'),
        alphabetical: kanjiMap.get(key).get('alphabetical'),
        heisig: kanjiMap.get(key).get('heisig'),
        frequency: kanjiMap.get(key).get('frequency'),
      })).toList();
    const order = this.state.currentOrder.toLowerCase();
    return kanjiList.sort((a, b) => {
      if (!a.get(order) && typeof a.get(order) === 'object') return 1;
      if (!b.get(order) && typeof b.get(order) === 'object') return 0;
      return a.get(order) - b.get(order);
    });
  }

  render() {
    const dateString = `
      Year: ${this.state.year} Month: ${this.state.month}
    `;
    return (
      <div>
        <header>
          <h1>{this.state.tweetFlash}</h1>
        </header>
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
            tweetFlash={this.state.tweetFlash}
          />
        </div>
      </div>
    );
  }
}

export default KanjiStore;
