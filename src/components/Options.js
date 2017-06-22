import React from 'react';
import PropTypes from 'prop-types';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  get options() {
    const optionKeys = Object.keys(this.props.possibleOptions);
    const renderOptions = (optionKey) => {
      const optionString = this.props.possibleOptions[optionKey];
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
      : 'Alphabetical';

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
        <input
          type="search"
          defaultValue={this.state.searchQuery}
        />
      </div>
    );
  }
}

Options.propTypes = {
  possibleOptions: PropTypes.objectOf(PropTypes.string).isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default Options;
