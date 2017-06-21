import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import { ArrowRight, ArrowLeft } from 'react-feather';

const CalendarHeader = ({ year, changeYear }) => {
  const canGoLeft  = (year > 2014);
  const canGoRight = (year < 2017);
  const styles = {
    hidden: { visibility: 'hidden' },
  };

  const onClick = (increment) => changeYear(year + increment);
  // TODO: change div to something more appropriate for clicking
  return (
    <Flexbox
      flexDirection="row"
      justifyContent="space-between"
    >
      <div
        style={!canGoLeft ? styles.hidden : {}}
        onClick={() => onClick(-1)}
      >
        <ArrowLeft />
      </div>

      {year}

      <div
        style={!canGoRight ? styles.hidden : {}}
        onClick={() => onClick(1)}
      >
        <ArrowRight />
      </div>
    </Flexbox>
  );
};

CalendarHeader.propTypes = {
  year: PropTypes.number.isRequired,
  changeYear: PropTypes.func.isRequired,
};

export default CalendarHeader;
