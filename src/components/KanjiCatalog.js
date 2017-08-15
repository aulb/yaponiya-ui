import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import About from '../components/About';
import Options from '../components/Options';
import KanjiListing from '../components/KanjiListing';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';

/* Instantiate sockets for live tweets */
const socket = io('http://reblws.me:8080');

class KanjiCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
      twitter: true,
    };
    this.handleTweet = this.handleTweet.bind(this);
    this.handleSwitchSort = this.handleSwitchSort.bind(this);
    this.handleSwitchOrder = this.handleSwitchOrder.bind(this);
  }

  componentDidMount() {
    // Initialize the very first ordering
    const { currentOrder, switchOrder } = this.props;
    switchOrder(currentOrder);

    socket.on('tweet', this.handleTweet);
  }

  componentWillUnmount() {
    socket.removeListener('tweet', this.handleTweet);
  }

  get kanjiList() {
    return typeof this.state.tweetFlash === 'object'
      ? this.state.tweetFlash
        .filter(kanji => this.props.kanjiMap.get(kanji))
        .reduce((acc, item) => acc.set(
          item,
          acc.get(item).set('isFlash', true),
        ), this.props.kanjiMap)
        .valueSeq().toList()
        .sort(this.props.sortFunction)
      : this.props.kanjiMap.valueSeq().toList().sort(this.props.sortFunction);
  }

  handleTweet(tweet) {
    this.setState({ tweetFlash: tweet });
  }

  handleSwitchOrder(event) {
    const newOrder = event.target.value;
    const { switchOrder } = this.props;
    switchOrder(newOrder);
  }

  handleSwitchSort(event) {
    const newSort = event.target.value;
    const { switchSort } = this.props;
    switchSort(newSort);
  }

  render() {
    return (
      <div>
        <Options
          switchSort={this.handleSwitchSort}
          switchOrder={this.handleSwitchOrder}
          currentSort={this.props.currentSort}
          currentOrder={this.props.currentOrder}
        />
        <KanjiListing
          kanjiList={this.kanjiList}
          currentOrder={this.props.currentOrder}
        />
        <About />
      </div>
    );
  }
}

KanjiCatalog.propTypes = {
  switchSort: PropTypes.func.isRequired,
  switchOrder: PropTypes.func.isRequired,
  sortFunction: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentOrder: PropTypes.string.isRequired,
  kanjiMap: ImmutablePropTypes.mapOf(KanjiCatalogItem).isRequired,
};

export default KanjiCatalog;
