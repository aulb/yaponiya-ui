import React from 'react';
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

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentYear: 2017,
    };
    this.changeYear = this.changeYear.bind(this);
  }

  get currentYear() {
    return this.state.currentYear;
  }

  changeYear(nextYear) {
    this.setState({ currentYear: nextYear });
  }

  render() {
    return (
      <div style={styles.container}>
        <CalendarHeader
          year={this.currentYear}
          changeYear={this.changeYear}
        />
        <Months />
      </div>
    );
  }
}

export default Calendar;
