import React from 'react';
import PropTypes from 'prop-types';
import { ORDER } from '../helpers/constants';

class Options extends React.Component {
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

  get options() {
    const optionKeys = Object.keys(ORDER);
    const renderOptions = (optionKey) => {
      const optionString = ORDER[optionKey];
      return (
        <option
          value={optionString}
          key={optionString}
        >
          {optionString}
        </option>
      );
    };
    return optionKeys.map(renderOptions);
  }

  render() {
    // '' is falsey
    const defaultValue = this.props.currentOrder
      ? this.props.currentOrder
      : ORDER.GRADE;

    // Flex our outerbox
    return (
      <div>
        <select
          name="options"
          onChange={this.props.switchOrder}
          value={defaultValue}
        >
          {this.options}
        </select>
      </div>
    );
  }
}

Options.propTypes = {
  //possibleOptions: PropTypes.objectOf(PropTypes.string).isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default Options;
