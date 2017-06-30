import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';
import { palette } from '../helpers/palette';

const SEQ_PALETTE = palette('cb-Blues', 6);

function KanjiContainer({ kanjiList }) {
  // Grab the largest kanji count to make a ratio against
  const counts = kanjiList.map(kanji => kanji.count).filter(count => count);
  const largestCount = Math.max(...counts);

  const kanjiCharacters = kanjiList.map((kanji) => {
    // Avoid nulls
    const count = kanji.count || 0;
    // Map percentage count to palette
    const paletteIndex = Math.floor((count / largestCount) * SEQ_PALETTE.length);
    const link = `/kanji/${kanji.id}`;
    const backgroundColor = `#${SEQ_PALETTE[paletteIndex]}`;
    const fontColor = (paletteIndex / SEQ_PALETTE.length) > 0.6
      ? '#fff'
      : '#000';
    return (
      <KanjiCharacter
        paletteIndex={paletteIndex}
        count={count}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        link={link}
        key={kanji.id}
      >
        {kanji.id}
      </KanjiCharacter>
    );
  });

  return (
    <div>
      { kanjiCharacters }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
