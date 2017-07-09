import { Map } from 'immutable';
import { JOYO_KANJI } from './constants';
import { ORDERS } from './orders';

/*
 * Initializes an empty KanjiList object
 */
export function kanjiFactory(numOfKanji) {
  let kanjiMap = Map({});

  // Make this pure
  JOYO_KANJI.map((character, index) => {
    kanjiMap = kanjiMap.set(character, Map({
      alphabetical: index, // TODO Remove?
      heisig: ORDERS.HEISIG[index],
      count: 0,
    }));
  });

  return kanjiMap;
}
