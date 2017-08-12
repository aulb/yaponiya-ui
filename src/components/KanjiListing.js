import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import KanjiCharacter from './KanjiCharacter';
import { FLASH_COLOR } from '../helpers/constants';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';
import { palette } from '../helpers/palette';

const styles = {
  container: {
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
// The top-N kanji that are statistically significant
const CUTOFF_INDEX = 50;
// Our color palette come from the color function in helpers/palette
const SEQ_PALETTE = palette('cb-Blues', 9).slice(1);

// TODO1: We look at the current order, and determine what type of variable it is
//          - Categorical       or        -Sequential
// TODO2: Need to detemrine which primary color we are using, depending on our
//        the order.
//            IF order === sequential: Then we just choose one primary hue,
//                                      and then make a gradient using math
//            ELSIF order === categorical: Then we need a set of colors,
//                                        and a way to detemrine how many
//                                        different sets of colors there are

// TODO: Revamp coloring
function getSortedCounts(kanjiList, order) {
  return kanjiList
    .map(kanji => kanji.get(order))
    .sort((a, b) => -(a - b));
}



function kanjiMapClosure(largestCount, mostUsedKanji, fetched = true) {
  return (kanji) => {
    // Avoid nulls
    const count = kanji.get('alphabetical') || 0;
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
        ? FLASH_COLOR
        : `#${bgColorHex}`;

      fontColor = isBGLight(paletteIndex, SEQ_PALETTE.length) || kanji.get('isFlash')
        ? '#000'
        : '#fff';
    } else {
      backgroundColor = 'black';
      fontColor = 'black';
    }


    const isFlash = backgroundColor === FLASH_COLOR;

    return (
      <KanjiCharacter
        fontColor={!fetched ? 'white' : fontColor}
        backgroundColor={!fetched ? 'black' : backgroundColor}
        link={link}
        key={kanji.id}
        isFlash={isFlash}
        fetched={fetched}
      >
        {kanji.id}
      </KanjiCharacter>
    );
  };
}

function KanjiListing({ kanjiList, currentOrder }) {
  // Grab the largest kanji count to make a ratio against
  const counts = getSortedCounts(kanjiList, currentOrder);
  const mostUsedKanji = counts.slice(0, CUTOFF_INDEX);
  const lessUsedKanji = counts.slice(CUTOFF_INDEX);
  // Only the largest count from the lessUsed otherwise
  // the color gradient won't be obvious
  const largestCount = lessUsedKanji.get(0);
  const kanjiMapFn = kanjiMapClosure(largestCount, mostUsedKanji);

  return (
    <div style={styles.container}>
      { kanjiList.map(kanjiMapFn) }
    </div>
  );
}

KanjiListing.propTypes = {
  kanjiList: ImmutablePropTypes.listOf(KanjiCatalogItem).isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default KanjiListing;
