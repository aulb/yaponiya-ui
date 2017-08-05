import React from 'react';
import PropTypes from 'prop-types';
import { makeSortOptions } from '../helpers/utils';

class SortOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      order: event.target.value,
    });
  }

  render() {
    const defaultValue = this.props.currentSort;

    // Flex our outerbox
    return (
      <div>
        <select
          name="options"
          onChange={this.props.switchSort}
          value={defaultValue}
        >
          {makeSortOptions()}
        </select>
      </div>
    );
  }
}

SortOptions.propTypes = {
  switchSort: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
};

export default SortOptions;
