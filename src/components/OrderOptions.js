import React from 'react';
import PropTypes from 'prop-types';
import { makeOrderOptions } from '../helpers/utils';

class OrderOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      order: event.target.value,
    });
  }

  render() {
    const defaultValue = this.props.currentOrder;

    // Flex our outerbox
    return (
      <div className="select" title="Order By:">
        <select
          name="options"
          onChange={this.props.switchOrder}
          value={defaultValue}
        >
          {makeOrderOptions()}
        </select>
        <div className="select__arrow" />
      </div>
    );
  }
}

OrderOptions.propTypes = {
  switchOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default OrderOptions;
