import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props); // What does this do?
    this.state = {
      currentOrder: '',
    };
    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
  }

  getKanjiInCurrentOrder() {
    const ALPHABET = 'Alphabetical';
    const TWITTER = 'Twitter';

    // This is redundant for now but replace returned expression with
    // sorting function when that's done
    switch (this.state.currentOrder) {
      case ALPHABET:
        return this.props.kanjiList;
      case TWITTER:
        return this.props.kanjiList;
      default:
        return this.props.kanjiList;
    }
  }

  switchOrder(order) {
    this.setState({ currentOrder: order });
  }

  render() {
    return (
      <div className="week-container">
        <KanjiContainer kanjiList={this.getKanjiInCurrentOrder()} />
      </div>
    );
  }
}

MainContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainContainer;
