import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty } from '../helpers/utils';

function KanjiStroke({ stroke }) {
  if (isPropEmpty(stroke)) return (<div />);

  return (<div />);
}

KanjiStroke.propTypes = {
  stroke: PropTypes.string.isRequired,
};

export default KanjiStroke;
