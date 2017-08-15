import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty } from '../helpers/utils';

function KanjiMeaning({ meaning }) {
  // Async band-aid solution
  if (isPropEmpty(meaning)) return '';

  return (
    <div>
      <h1>Meaning</h1>
      <hr />
      {meaning.join(', ')}
    </div>
  );
}

KanjiMeaning.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/904
  meaning: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KanjiMeaning;
