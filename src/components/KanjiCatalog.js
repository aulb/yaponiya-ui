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
    // Fetch nhk counts
    this.props.fetchData('http://reblws.me:5000/api/data/nhk');
    // Open sockets for live tweets
    const socket = io('http://reblws.me:8080');
    socket.on('tweet', this.handleTweet);
  }

  get kanjiList() {
    return this.state.tweetFlash
      .map(kanji => this.props.kanjiMap.get(kanji).set('isFlash', true))
      .reduce((acc, item) => acc.set(item.id, item), this.props.kanjiMap)
      .valueSeq()
      .toList()
      .sort(this.props.currentSort);
  }

  handleTweet(tweet) {
    this.setState({ tweetFlash: tweet });
  }

  render() {
    return (
      <KanjiListing
        kanjiList={this.kanjiList}
        fetched={this.props.fetched}
      />
    );
  }
}

KanjiCatalog.propTypes = {
  kanjiMap: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.record(KanjiCatalogItem),
  ).isRequired,
  currentSort: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  // updateSort: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default KanjiCatalog;
