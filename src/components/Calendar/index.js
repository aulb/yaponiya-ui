import React from 'react';
import Flexbox from 'flexbox-react';
import './CalendarHeader';
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
  container: {
    // maxWidth 426 gives us a nice 6 items per row w/ our flexbox setup, not the best sol'n but its good for now
    maxWidth: 426,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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


// TODO: split our flexbox containers into two separate components
//        and use this current Calendar component to keep track our
//        year state

const Calendar = () => (
  <div style={styles.container}>
    <CalendarHeader />
    <Flexbox
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      flex={1}
    >
      {jsxMonths}
    </Flexbox>
  </div>
);

export default Calendar;
