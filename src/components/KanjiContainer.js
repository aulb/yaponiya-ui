import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';
import { getRandomHue } from '../helpers/utils';

const hue = getRandomHue();
const color = ["#E3F2FD",
"#BBDEFB",
"#90CAF9",
"#64B5F6",
"#42A5F5",
"#2196F3",
"#1E88E5",
"#1976D2",
"#1565C0",
"#0D47A1"]

function KanjiContainer(props) {
  const kanjiLength = props.kanjiList.length;
  const kanjiJSXList = props.kanjiList.map((kanjiObject, index) => {
    // using the index, calculate S and L
    const calculateLightness = (min, max) => (
      index / kanjiLength * (max - min) + min
    );
    const saturation = `50%`;
    const lightness = calculateLightness(35, 85);
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
