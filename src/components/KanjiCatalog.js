import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import SortOptions from '../components/SortOptions';
import OrderOptions from '../components/OrderOptions';
import KanjiListing from '../components/KanjiListing';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';

class KanjiCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
    };
    this.handleTweet = this.handleTweet.bind(this);
    this.handleSwitchSort = this.handleSwitchSort.bind(this);
    this.handleSwitchOrder = this.handleSwitchOrder.bind(this);
  }

  componentDidMount() {
    // Initialize the very first ordering
    const { currentOrder, switchOrder } = this.props;
    switchOrder(currentOrder);

    /* Open sockets for live tweets */
    // const socket = io('http://reblws.me:8080');
    // socket.on('tweet', this.handleTweet);
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
        <OrderOptions
          switchOrder={this.handleSwitchOrder}
          currentOrder={this.props.currentOrder}
        />
        <SortOptions
          switchSort={this.handleSwitchSort}
          currentSort={this.props.currentSort}
        />
        <KanjiListing
          kanjiList={this.kanjiList}
          currentOrder={this.props.currentOrder}
        />
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
