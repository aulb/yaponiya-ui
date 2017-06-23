import React from 'react';
import { Link } from 'react-router-dom';
import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const styles = {
  month: {
    backgroundColor: 'red',
    color: 'white',
    margin: 5,
    width: 50,
    height: 50,
    border: '1px solid black',
  },
};


const Months = ({ year }) => {
  const jsxMonths = MONTHS.map(month => (
    <Flexbox
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      key={month}
      style={styles.month}
    >
      <Link to={`/${year}/${MONTHS.indexOf(month) + 1}`}>{month}</Link>
    </Flexbox>
  ));
  return (
    <Flexbox
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      flex="1"
    >
      {jsxMonths}
    </Flexbox>
  );
};

Months.propTypes = {
  year: PropTypes.number.isRequired,
}

export default Months;
