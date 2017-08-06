import React from 'react';
import PropTypes from 'prop-types';
import SortOptions from '../components/SortOptions';
import OrderOptions from '../components/OrderOptions';

function Options({ switchSort, switchOrder, currentSort, currentOrder }) {
  return (<div>
    <OrderOptions
      switchOrder={switchOrder}
      currentOrder={currentOrder}
    />
    <SortOptions
      switchSort={switchSort}
      currentSort={currentSort}
    />
  </div>);
}

Options.propTypes = {
  switchSort: PropTypes.func.isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default Options;
