import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import About from '../components/About';
import Options from '../components/Options';
import KanjiListing from '../components/KanjiListing';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';
import socketClient from '../helpers/SocketClient';

class KanjiCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFlash: [],
      twitter: false,
    };
    this.handleTweet = this.handleTweet.bind(this);
    this.handleSwitchSort = this.handleSwitchSort.bind(this);
    this.handleSwitchOrder = this.handleSwitchOrder.bind(this);
    this.toggleStream = this.toggleStream.bind(this);
  }

  componentDidMount() {
    // Initialize the very first ordering
    const { currentOrder, switchOrder } = this.props;
    switchOrder(currentOrder);

    if (!socketClient.exists()) {
      socketClient.initialize();
    }
  }

  componentWillUnmount() {
    if (socketClient.exists()) {
      socketClient.unlistenTweet(this.handleTweet);
    }
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

  toggleStream() {
    this.setState({
      twitter: !this.state.twitter,
    });

    // If streaming is activated, please help clean this up...
    if (!this.state.twitter) socketClient.listenTweet(this.handleTweet);
    else socketClient.unlistenTweet(this.handleTweet);
  }

  render() {
    return (
      <div>
        <div>
          {
            Options({
              switchSort: this.handleSwitchSort,
              switchOrder: this.handleSwitchOrder,
              currentSort: this.props.currentSort,
              currentOrder: this.props.currentOrder,
              isActive: this.state.twitter,
              toggleStream: this.toggleStream,
            })
          }
        </div>
        <div>
          {
            KanjiListing({
              kanjiList: this.kanjiList,
              currentOrder: this.props.currentOrder,
            })
          }
          { About() }
        </div>
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
