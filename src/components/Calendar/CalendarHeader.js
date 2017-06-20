// TODO2: Have to add buttons to our CalendarHeader div,
//        set flexdirection to 'row', justifycontent to 'spacebetween'
//        And then have links surrounding the CURRENTYEAR,
//        each click on the link will change year state

import React from 'react';
import Flexbox from 'flexbox-react';
import { ArrowRight, ArrowLeft } from 'react-feather';

const CalendarHeader = () => {
  return (
    <Flexbox
      flexDirection="row"
      justifyContent="space-between"
    >
      <div><ArrowLeft /></div>
      <div>CURRENTYEAR</div>
      <div><ArrowRight /></div>
    </Flexbox>
  );
};

export default CalendarHeader;
