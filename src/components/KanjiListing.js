import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import KanjiCharacter from './KanjiCharacter';
import KanjiCatalogItem from '../helpers/KanjiCatalogItem';
import {
  FLASH_COLOR,
  UNDEFINED_COLOR,
  getUniqueOrderTypeAmount,
  isAmountValid,
  getPalette,
} from '../helpers/constants';

// TODO1: We look at the current order, and determine what type of variable it is
//          - Categorical       or        -Sequential
// TODO2: Need to detemrine which primary color we are using, depending on our
//        the order.
//            IF order === sequential: Then we just choose one primary hue,
//                                      and then make a gradient using math
//            ELSIF order === categorical: Then we need a set of colors,
//                                        and a way to detemrine how many
//                                        different sets of colors there are

function calculateRatio(nominator, denominator) {
  return (nominator / denominator || denominator === 0) > 1
    ? 1
    : nominator / denominator;
}

function getPaletteIndex(countRatio, paletteLength) {
  return Math.floor(countRatio * (paletteLength - 1));
}

/* https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color */
function isBGLight(paletteIndex, paletteLength) {
  return paletteIndex < paletteLength - 3;
}

function KanjiListing({ kanjiList, currentOrder }) {
  const uniqueAmount = getUniqueOrderTypeAmount(currentOrder);
  const currentPalette = getPalette(currentOrder);

  function determineKanjiColor() {
    return (kanji) => {
      const amount = kanji.get(currentOrder);

      let backgroundColor;
      let fontColor;

      if (isAmountValid(currentOrder, amount)) {
        const countRatio = calculateRatio(amount, uniqueAmount);
        const paletteIndex = getPaletteIndex(countRatio, currentPalette.length);
        const bgColorHex = currentPalette[paletteIndex];
        backgroundColor = kanji.get('isFlash') ?
            FLASH_COLOR
            : `#${bgColorHex}`;
        fontColor = isBGLight(paletteIndex, currentPalette.length) || kanji.get('isFlash')
          ? '#000'
          : '#fff';
      } else {
        backgroundColor = UNDEFINED_COLOR;
        fontColor = '#fff';
      }

      /* Removed fetch, if fetched display properly otherwise display white/non existant */
      return (
        <KanjiCharacter
          backgroundColor={backgroundColor}
          fontColor={fontColor}
          key={kanji.id}
          kanjiKey={kanji.id}
        />
      );
    };
  }

  return (
    <div>
      { kanjiList.map(determineKanjiColor()) }
    </div>
  );
}

KanjiListing.propTypes = {
  kanjiList: ImmutablePropTypes.listOf(KanjiCatalogItem).isRequired,
  currentOrder: PropTypes.string.isRequired,
};

export default KanjiListing;
