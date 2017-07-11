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
    this.props.fetchData('http://reblws.me:5000/api/data/nhk');
    // Open sockets for live tweets
    const socket = io('http://reblws.me:8080');
    socket.on('tweet', this.handleTweet);
    // Fetch NHK data
  }

  get kanjiList() {
    return this.props.kanjiList.map((kanjiItem) => {
      const id = kanjiItem.id;
      return this.state.tweetFlash.includes(id)
        ? kanjiItem.set('isFlash', true)
        : kanjiItem;
    });
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
  kanjiList: ImmutablePropTypes.listOf(
    ImmutablePropTypes.record(KanjiCatalogItem),
  ).isRequired,
  fetched: PropTypes.bool.isRequired,
  // updateSort: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default KanjiCatalog;
