import { KanjiCatalogItem } from './KanjiCatalogItem';
import { JOYO_KANJI } from './constants';
import { ORDERS } from './orders';

/*
 * Initializes an empty KanjiList object
 */
export default function kanjiFactory(numOfKanji) {
  let kanjiMap = Map({});
  // Slice off the kanji we don't want by index
  const joyoKanji = JOYO_KANJI.slice(0, numOfKanji - 1);

  // Make this pure
  return joyoKanji.map((character, index) => {
    kanjiMap = kanjiMap.set(
      character,
      new KanjiCatalogItem({
        id: character,
        alphabetical: index, // TODO Remove?
        heisig: ORDERS.HEISIG[index],
        count: 0,
      }),
    );
  });
}
