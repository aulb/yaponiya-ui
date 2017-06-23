import React from 'react';
import PropTypes from 'prop-types';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
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
          placeholder="Try searching for Kanji"
          defaultValue={this.state.searchQuery}
          onChange={this.onChange}
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
