import { Map } from 'immutable';
import { JOYO_KANJI } from './constants';
import { ORDERS } from './orders';

/*
 * Initializes an empty KanjiList object
 */
export default function kanjiFactory(numOfKanji) {
  let kanjiMap = Map({});
  const joyoKanji = JOYO_KANJI.slice(0, numOfKanji - 1);

  // Make this pure
  return joyoKanji.map((character, index) => {
    kanjiMap = kanjiMap.set(character, Map({
      alphabetical: index, // TODO Remove?
      heisig: ORDERS.HEISIG[index],
      count: 0,
    }));
  });
}
