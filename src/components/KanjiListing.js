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
  determineFontColor,
} from '../helpers/constants';

function calculateRatio(nominator, denominator) {
  return (nominator / denominator || denominator === 0) > 1
    ? 1
    : nominator / denominator;
}

function getPaletteIndex(countRatio, paletteLength) {
  return Math.floor(countRatio * (paletteLength - 1));
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
        backgroundColor = kanji.get('isFlash')
          ? FLASH_COLOR
          : `#${bgColorHex}`;

        fontColor = kanji.get('isFlash')
          ? '#000'
          : determineFontColor(backgroundColor);
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
