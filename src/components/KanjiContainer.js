import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';

/*
 * Get color from a predefined list.
 */

function KanjiContainer(props) {
  let kanjiJSXList = [];
  for (let character in props.kanjiList) {
    let currentProp = props.kanjiList[character];
    kanjiJSXList.push((
      <Kanji
        character={character}
        color={currentProp.color}
        key={character}
      />
    ));
  }

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.object.isRequired,
};

export default KanjiContainer;
