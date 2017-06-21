import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';

/*
 * Get color from a predefined list.
 */
function KanjiContainer(props) {
  let kanjiJSXList = Array(props.numOfKanji);

  Object.keys(props.kanjiList).map((character) => {
    let currentKanjiProp = props.kanjiList[character];
    kanjiJSXList[currentKanjiProp.position] = (
      <KanjiCharacter
        character={character}
        color={currentKanjiProp.color}
        key={character}
      />
    );
    return null;
  });

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.object.isRequired,
  numOfKanji: PropTypes.number,
};

export default KanjiContainer;
