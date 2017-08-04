import { Map } from 'immutable';
import KanjiCatalogItem from './KanjiCatalogItem';
import { JOYO_KANJI } from './constants';

/*
 * Initializes an empty KanjiList object
 */
export default function kanjiFactory(numOfKanji) {
  let kanjiMap = Map();
  // Slice off the kanji we don't want by index
  const joyoKanji = JOYO_KANJI.slice(0, numOfKanji);

  joyoKanji.forEach((character, index) => {
    kanjiMap = kanjiMap.set(
      character,
      new KanjiCatalogItem({
        id: character,
        // Default ordering for no internet... well sucks when theres no wifi
        alphabetical: index,
        // The rest of the attributes are the defaults
      }),
    );
  });

  return kanjiMap;
}
