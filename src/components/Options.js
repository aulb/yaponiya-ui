import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalendarActive: false,
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  toggleCalendar() {
    const isCalendarActive = !this.state.isCalendarActive;
    this.setState({
      isCalendarActive,
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

    return (
      <div className="options-controls">
        <div className="options-bar">
          <select
            name="options"
            onChange={this.props.switchOrder}
            value={defaultValue}
          >
            {this.options}
          </select>
          <button onClick={this.toggleCalendar}>
            Calendar
          </button>
        </div>
        {this.state.isCalendarActive &&
          <Calendar />
        }
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
