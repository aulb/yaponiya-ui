import React from 'react';
import PropTypes from 'prop-types';

function Options(props) {
  const options = Object.keys(props.possibleOptions).map((optionKey) => {
    const optionString = props.possibleOptions[optionKey];
    return (
      <option
        value={optionString}
        key={optionString}
      >
        {optionString}
      </option>
    );
  });

  // '' is falsey
  const defaultValue = props.currentOrder
    ? props.currentOrder
    : 'Alphabetical';

  return (
    <div className="options-bar">
      <select
        name="options"
        onChange={props.switchOrder}
        value={defaultValue}
      >
        {options}
      </select>
    </div>
  );
}

Options.propTypes = {
  possibleOptions: PropTypes.objectOf(PropTypes.string).isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default Options;
