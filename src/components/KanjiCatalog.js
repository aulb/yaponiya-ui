import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Options from '../components/Options';
import KanjiListing from '../components/KanjiListing';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';

class KanjiCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
    };
    this.handleTweet = this.handleTweet.bind(this);
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
        .sort(this.props.currentSort)
      : this.props.kanjiMap.valueSeq().toList().sort(this.props.currentSort);
  }

  handleTweet(tweet) {
    this.setState({ tweetFlash: tweet });
  }

  handleSwitchOrder(event) {
    const newOrder = event.target.value;

    const { switchOrder } = this.props;
    switchOrder(newOrder);
  }

  render() {
    return (
      <div>
        <Options
          switchOrder={this.handleSwitchOrder}
          currentOrder={this.props.currentOrder}
        />
        <KanjiListing
          kanjiList={this.kanjiList}
          fetched={this.props.fetched}
          currentOrder={this.props.currentOrder}
        />
      </div>
    );
  }
}

KanjiCatalog.propTypes = {
  kanjiMap: ImmutablePropTypes.mapOf(KanjiCatalogItem).isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentSort: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
};

export default KanjiCatalog;
