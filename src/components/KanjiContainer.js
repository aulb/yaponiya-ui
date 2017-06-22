import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';

/*
 * Get color from a predefined list.
 */
function KanjiContainer({ kanjiMap, numOfKanji }) {
  let kanjiJSXList = Array(numOfKanji);

  Object.keys(kanjiMap).map((character) => {
    let currentKanjiProp = kanjiMap[character];
    kanjiJSXList[currentKanjiProp.position] = (
      <KanjiCharacter
        character={character}
        color={currentKanjiProp.color}
        key={character}
      />
    return null;
    );
  });

  return (
    <div>
      { kanjiJSXList }
    </div>
  );
};

KanjiContainer.propTypes = {
  kanjiMap: PropTypes.objectOf(PropTypes.object).isRequired,
  numOfKanji: PropTypes.number,
};

export default KanjiContainer;
