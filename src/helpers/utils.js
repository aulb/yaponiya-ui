import { Map } from 'immutable';
import { JOYO_KANJI } from './constants';
import { ORDERS } from './orders';

/*
 * Initializes an empty KanjiList object
 */
export function kanjiFactory(numOfKanji) {
  let kanjiMap = Map({});

  // Decides ordering
  const orderArr = ORDERS.ALPHABETICAL;

  for (let i = 0; i < numOfKanji; i++) {
    const currentChar = JOYO_KANJI[orderArr[i]];
    kanjiMap = kanjiMap.set(currentChar, Map({
      alphabetical: ORDERS.ALPHABETICAL[i],
      heisig: ORDERS.HEISIG[i],
      //frequency: ORDERS.FREQUENCY[i],
      count: 0,
    }));
  }
  return kanjiMap;
}
