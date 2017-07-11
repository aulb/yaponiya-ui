import React, { Component } from 'react';
import Immutable from 'immutable';
import io from 'socket.io-client';
import Options from '../components/Options';
import { fetchData, updateSort } from '../actions';

const socket = io('http://reblws.me:8080');


function mapStateToProps(state) {
  return {
    kanjiList: getKanjiList(state.kanjis),
    currentSort: state.currentSort,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSort:
  }
}

class KanjiCatalogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
    };
    this.switchOrder = this.switchOrder.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    socket.on('tweet', this.handleTweet);

    const kanjiReducer = response => (acc, key) => {
      const newCount = response[key];
      const newKanjiEntry = acc.get(key).set('count', newCount);
      return acc.set(key, newKanjiEntry);
    };

    const fetchReducer = kanjiMap => (
      (response) => {
        const filteredKeys = Object.keys(response).filter(key => kanjiMap.get(key));
        const reduceKeysToKanji = kanjiReducer(response);
        return filteredKeys.reduce(reduceKeysToKanji, kanjiMap);
      }
    );

    const updateKanjiMap = fetchReducer(this.state.kanjiMap);

    fetch('http://reblws.me:5000/api/data/nhk')
      .then(response => response.json())
      .then(updateKanjiMap)
      .then(this.handleFetch);
  }

  handleFetch(kanjiMap) {
    this.setState({ kanjiMap });
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

    const order = this.state.currentOrder.toLowerCase();
    return kanjiList.sort((a, b) => {
      const descending = -(a.get(order) - b.get(order));
      const ascending = a.get(order) - b.get(order);

      return order === 'nhk' // TODO revamp
        ? descending
        : ascending;
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
        <Options
          currentOrder={this.state.currentOrder}
          switchOrder={this.switchOrder}
          possibleOptions={OPTIONS}
        />
        <KanjiListing kanjiList={this.kanjiList} />
      </div>
    );
  }
}

export default KanjiCatalogContainer;
