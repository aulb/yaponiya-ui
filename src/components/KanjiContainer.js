import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';
import { palette } from '../helpers/palette';
// The top-N kanji that are statistically significant
const CUTOFF_INDEX = 50;
const SEQ_PALETTE = palette('cb-Blues', 9).slice(1);
// const SEQ_PALETTE2 = [
  // 'F7FCFD',
  // 'E0ECF4',
  // 'BFD3E6',
  // '9EBCDA',
  // '8C96C6',
  // '8C6BB1',
  // '88419D',
  // '810F7C',
  // '4D004B',
// ];

function getSortedCounts(kanjiList) {
  return kanjiList.map(kanji => kanji.get('count'))
    .sort((a, b) => -(a - b));
}

function calculateRatio(count, largestCount) {
  return count / largestCount > 1
    ? 1
    : count / largestCount;
}

function getPaletteIndex(countRatio) {
  return Math.floor(countRatio * (SEQ_PALETTE.length - 1));
}

// Set up
function kanjiMapClosure(largestCount, mostUsedKanji) {
  return (kanji) => {
    // Avoid nulls
    const count = kanji.get('count') || 0;
    const countRatio = calculateRatio(count, largestCount);
    // Map percentage count to palette
    const paletteIndex = getPaletteIndex(countRatio);
    // const link = `/kanji/${kanji.get('id')}`;
    // Check if kanji has a significant count, grab
    const bgColorHex = mostUsedKanji.includes(count)
      ? '4D004B'
      : SEQ_PALETTE[paletteIndex];

    const backgroundColor = kanji.get('isFlash')
      ? 'yellow'
      : `#${bgColorHex}`;

    const fontColor = countRatio > 0.7 && !kanji.get('isFlash')
      ? '#fff'
      : '#000';
    return (
      <KanjiCharacter
        paletteIndex={paletteIndex}
        count={count}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        key={kanji.get('id')}
      >
        {String(kanji.get('id'))}
      </KanjiCharacter>
    );
  };
}

function KanjiContainer({ kanjiList, tweetFlash }) {
  // Grab the largest kanji count to make a ratio against
  const counts = getSortedCounts(kanjiList);
  const mostUsedKanji = counts.slice(0, CUTOFF_INDEX);
  const lessUsedKanji = counts.slice(CUTOFF_INDEX);
  // Only the largest count from the lessUsed otherwise
  // the color gradient won't be obvious
  const largestCount = lessUsedKanji.get(0);

  const kanjiMapFn = kanjiMapClosure(largestCount, mostUsedKanji);

  return (
    <div>
      { kanjiList.map(kanjiMapFn) }
    </div>
  );
}

KanjiContainer.propTypes = {
  tweetFlash: PropTypes.arrayOf(PropTypes.string).isRequired,
  kanjiList: ImmutablePropTypes.list.isRequired,
};

export default KanjiContainer;
