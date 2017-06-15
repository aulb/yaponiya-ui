import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';
import { getRandomHue } from '../helpers/utils';

/*
 * Get color from a predefined list.
 */

function KanjiContainer(props) {
  const kanjiLength = props.kanjiList.length;
  const kanjiJSXList = props.kanjiList.map((kanjiObject, index) => {
    return (
      <Kanji
        character={kanjiObject.character}
        color={kanjiObject.color}
        key={kanjiObject.character}
      />
    );
  });

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
