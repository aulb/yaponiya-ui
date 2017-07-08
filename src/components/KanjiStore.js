import React, { Component } from 'react';
import Immutable from 'immutable';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import io from 'socket.io-client';
import { kanjiFactory } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';

// const socket = io('http://reblws.me:8080');
const numOfKanji = 2136;
const styles = {
  weekContainer: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

class KanjiStore extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentOrder: OPTIONS.FREQUENCY,
      /* Example kanji state object
        [
          {
            id: currentChar,
            alphabetical: ORDERS.ALPHABETICAL[i],
            heisig: ORDERS.HEISIG[i],
            frequency: ORDERS.KanjiFactory(numOfKanji),FREQUENCY[i],
            isFlash: false
          },
        ]
      */
      kanjiMap: Immutable.Map(kanjiFactory(numOfKanji)),
      // kanjiList: kanjiFactory(numOfKanji),
      tweetFlash: [],
    };
    this.switchOrder = this.switchOrder.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleFetch(kanjiMap) {
    this.setState({ kanjiMap });
  }


  componentDidMount() {
    // socket.on('tweet', data => this.handleTweet(data));

    const reduceKanji = responseObject => (
      (acc, key) => {
        const newCount = responseObject[key];
        const newKanjiEntry = acc.get(key).set('count', newCount);
        return acc.set(key, newKanjiEntry);
      }
    );

    const fetchClosure = kanjiMap => (
      (response) => {
        const filteredResponse = Object.keys(response).filter(key => kanjiMap.get(key));
        const reduceKeysToKanji = reduceKanji(response, kanjiMap);
        return filteredResponse.reduce(reduceKeysToKanji, kanjiMap);
      }

    );
    const updateKanjiMap = fetchClosure(this.state.kanjiMap);

    fetch('http://reblws.me:5000/api/data/nhk')
      .then(response => response.json())
      .then(updateKanjiMap)
      .then(kanjiMap => {
        // console.log(kanjiMap);
        this.handleFetch(kanjiMap);
      });

      // .then((kanjiMap) => {
        // console.log('fetch');
        // this.setState({ kanjiMap });
      // });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.kanjiMap);
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
        nhk: kanjiMap.get(key).get('count'),
        isFlash: this.state.tweetFlash.includes(key),
      })).toList();
    const order = this.state.currentOrder.toLowerCase();
    return kanjiList.sort((a, b) => {
      if (!a.get(order) && typeof a.get(order) === 'object') return 1;
      if (!b.get(order) && typeof b.get(order) === 'object') return 0;
      return order === 'nhk' // TODO revamp
        ? -(a.get(order) - b.get(order))
        : (a.get(order) - b.get(order));
    });
  }

  render() {
    /* DEBUG
    <header>
      <h1>{this.state.tweetFlash}</h1>
    </header>
    */
    return (
      <div>
        <div style={styles.weekContainer}>
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
