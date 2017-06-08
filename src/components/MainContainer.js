import React, { Component } from 'react';
import KanjiContainer from './KanjiContainer';

function order(ordering) {
  return 1;
}

class MainContainer extends Component {
  constructor(props) {
    super(props); // What does this do?
    this.state = {
      currentOrder: ''
    };
    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
  }

  switchOrder(order) {
    this.setState({
      currentOrder: order,
    })
  }

  // const ALPHABETICAL = 1;
  // const TWITTER = 2;

  getKanjiInCurrentOrder() {
    switch(this.state.currentOrder) {
      case 'Alphebetical':
        //
      case 'Twitter':
        //sdoajsdoajsdojasd
      default:
        break;
    }
  }
  // <options switchOrder={this.switchOrder}
  render() {
    return <KanjiContainer kanjiList={ this.props.kanjiList } />
  }
}

export default MainContainer;
