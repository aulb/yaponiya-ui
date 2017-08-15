import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty, capitalizeLabel } from '../helpers/utils';

function KanjiReading({ reading }) {
  if (isPropEmpty(reading)) return null;

  const Reading = (label) => {
    const readings = reading[label];
    if (isPropEmpty(readings)) return null;

    return (
      <li>
        <strong>{capitalizeLabel(label)}</strong>: {readings.join(', ')}
      </li>
    );
  };

  return (<div>
    <h1>Readings</h1>
    <hr />
    <ul>
      { Reading('onyomi') }
      { Reading('kunyomi') }
      { Reading('nanori') }
    </ul>
  </div>);
}

KanjiReading.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/904
  reading: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default KanjiReading;
