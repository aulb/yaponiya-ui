import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';

/*
 * Get color from a predefined list.
 */
function KanjiContainer({ kanjiList }) {
  const kanjiCharacters = kanjiList.map(kanji => (
    <KanjiCharacter
      character={kanji.id}
      color={kanji.color}
      key={kanji.id}
    />
  ));

  return (
    <div>
      { kanjiCharacters }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
