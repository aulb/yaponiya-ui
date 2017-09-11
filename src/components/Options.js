import React from 'react';
import PropTypes from 'prop-types';
import SortOptions from '../components/SortOptions';
import OrderOptions from '../components/OrderOptions';
import TweetButton from '../components/TweetButton';

function Options({
  switchSort,
  switchOrder,
  currentSort,
  currentOrder,
  isActive,
  toggleStream,
}) {
  return (<div>
    <OrderOptions
      switchOrder={switchOrder}
      currentOrder={currentOrder}
    />
    <SortOptions
      switchSort={switchSort}
      currentSort={currentSort}
    />
    {
      TweetButton({
        isActive,
        toggleStream,
      })
    }
  </div>);
}

Options.propTypes = {
  switchSort: PropTypes.func.isRequired,
  switchOrder: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentOrder: PropTypes.string.isRequired,
  toggleStream: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Options;
