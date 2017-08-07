import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty } from '../helpers/utils';

function KanjiMeaning({ meaning }) {
  // Async band-aid solution
  if (isPropEmpty(meaning)) return (<div />);

  return (
    <div>
      <h1>Meaning</h1>
      {meaning.join(', ')}
    </div>
  );
}

KanjiMeaning.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/904
  meaning: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default KanjiMeaning;
