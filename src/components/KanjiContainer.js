import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';
import { palette } from '../helpers/palette';

const SEQ_PALETTE = palette('cb-Blues', 9).slice(1);
const SEQ_PALETTE2 = [
  'F7FCFD',
  'E0ECF4',
  'BFD3E6',
  '9EBCDA',
  '8C96C6',
  '8C6BB1',
  '88419D',
  '810F7C',
  '4D004B',
];

function KanjiContainer({ kanjiList }) {
  // Grab the largest kanji count to make a ratio against
  const counts = kanjiList.map(kanji => kanji.count)
    .filter(count => count)
    .sort((a, b) => -(a - b)); // largest num first
  const cutoffCountIndex = 50;
  const significantKanji = counts.slice(0, cutoffCountIndex);
  const otherKanji = counts.slice(cutoffCountIndex);
  const largestCount = otherKanji[0];
  const kanjiCharacters = kanjiList.map((kanji) => {
    // Avoid nulls
    const count = kanji.count || 0;
    const countRatio = count / largestCount > 1
      ? 1
      : count / largestCount;
    // Map percentage count to palette
    const paletteIndex = Math.floor(countRatio * (SEQ_PALETTE.length - 1));
    const link = `/kanji/${kanji.id}`;
    // Check if kanji has a significant count, grab
    const bgColorHex = significantKanji.includes(count)
      ? '4D004B'
      : SEQ_PALETTE[paletteIndex];
    const backgroundColor = `#${bgColorHex}`;
    const fontColor = countRatio > 0.7
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

// h2 - debugging
  return (
    <div>
      <h2 style={{color: 'red'}}>Largest count: {largestCount} | Sig. Kanji {significantKanji.length} | First Count: {counts[0]} | countslength: {counts.length}</h2>
      { kanjiCharacters }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
