import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import KanjiCharacter from './KanjiCharacter';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';
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

const styles = {
  container: {
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

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

function isBGLight(paletteIndex, paletteLength) {
  return paletteIndex < paletteLength - 3;
}

// Set up
function kanjiMapClosure(largestCount, mostUsedKanji, fetched) {
  return (kanji) => {
    // Avoid nulls
    const count = kanji.get('count') || 0;
    const link = `/kanji/${kanji.id}`;


    let backgroundColor;
    let fontColor;
    if (fetched) {
      const countRatio = calculateRatio(count, largestCount);
      const paletteIndex = getPaletteIndex(countRatio);
      const bgColorHex = mostUsedKanji.includes(count)
        ? '4D004B'
        : SEQ_PALETTE[paletteIndex];

      backgroundColor = kanji.get('isFlash')
        ? 'yellow'
        : `#${bgColorHex}`;

      fontColor = isBGLight(paletteIndex, SEQ_PALETTE.length) || kanji.get('isFlash')
        ? '#000'
        : '#fff';
    } else {
      backgroundColor = 'black';
      fontColor = 'black';
    }

    return (
      <KanjiCharacter
        fontColor={!fetched ? 'white' : fontColor}
        backgroundColor={!fetched ? 'black' : backgroundColor}
        link={link}
        key={kanji.id}
      >
        {kanji.id}
      </KanjiCharacter>
    );
  };
}

function KanjiListing({ kanjiList, fetched }) {
  // Grab the largest kanji count to make a ratio against
  const counts = getSortedCounts(kanjiList);
  const mostUsedKanji = counts.slice(0, CUTOFF_INDEX);
  const lessUsedKanji = counts.slice(CUTOFF_INDEX);
  // Only the largest count from the lessUsed otherwise
  // the color gradient won't be obvious
  const largestCount = lessUsedKanji.get(0);
  const kanjiMapFn = kanjiMapClosure(largestCount, mostUsedKanji, fetched);

  return (
    <div style={styles.container}>
      { kanjiList.map(kanjiMapFn) }
    </div>
  );
}

KanjiListing.propTypes = {
  kanjiList: ImmutablePropTypes.listOf(KanjiCatalogItem).isRequired,
  fetched: PropTypes.bool.isRequired,
};

export default KanjiListing;
