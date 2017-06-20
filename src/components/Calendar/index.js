import React from 'react';
import Flexbox from 'flexbox-react';
import CalendarHeader from './CalendarHeader';
import Months from './Months';


const styles = {
  container: {
    // maxWidth 426 gives us a nice 6 items per row w/ our flexbox setup, not
    // the best sol'n but its good for now
    maxWidth: 426,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const Calendar = () => (
  <div style={styles.container}>
    <CalendarHeader />
    <Months />
  </div>
);

export default Calendar;
