import React from 'react';
import Flexbox from 'flexbox-react';

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

const jsxMonths = MONTHS.map(month => (
  <Flexbox
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    key={month}
    style={styles.month}
  >
    {month}
  </Flexbox>
));

const Months = () => {
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

export default Months;
