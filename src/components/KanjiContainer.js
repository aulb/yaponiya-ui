import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';


function KanjiContainer(props) {
  const kanjiLength = props.kanjiList.length;
  const kanjiJSXList = props.kanjiList.map((kanjiObject, index) => {
    // using the index, calculate S and L
    const calculateLightness = (min, max) => (
      ((index / kanjiLength) * (max - min)) + min
    );
    const hue = 360;
    const saturation = `50%`;
    const lightness = calculateLightness(50, 75);
    const hsl = `hsl(${hue}, ${saturation}, ${lightness}%`;
    return (
      <Kanji
        character={kanjiObject.character}
        color={hsl}
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
