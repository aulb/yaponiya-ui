import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import KanjiListing from '../components/KanjiListing';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';

class KanjiCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
    };
    this.handleTweet = this.handleTweet.bind(this);
  }

  componentDidMount() {
    const { currentOrder, fetchData } = this.props;
    // Fetch orders
    fetchData(`http://reblws.me:5000/api/order/${currentOrder}`);
    // Open sockets for live tweets
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

  render() {
    return (
      <div>
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
  currentSort: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default KanjiCatalog;
