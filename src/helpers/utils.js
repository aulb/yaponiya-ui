import { JOYO_KANJI } from './constants';
import { color } from './colors';

/*
 * Creates a copy of the Kanji array and shuffles the content
 * in place.
 */
function shuffleJoyoKanji() {
  // Duplicate our original list, spread is .slice()
  const kanjiList = [...JOYO_KANJI];
  // Swapping the good old way is fast and legible
  let tempCharacter = null;
  let j = 0;
  for (let i = 0; i < kanjiList.length; i++) {
    j = getRandomInt(0, kanjiList.length);
    tempCharacter = kanjiList[i];
    kanjiList[i] = kanjiList[j];
    kanjiList[j] = tempCharacter;
  }
  return kanjiList;
}

export function getRandomHue() {
  return getRandomInt(0, 360);
}

/*
 * Generates a random integer between an interval.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

/*
 * Creates (initializes) a basic Kanji object.
 */
export function kanjiFactory(numOfKanji) {
  // https://github.com/jamesknelson/node-joyo-kanji/blob/master/index.js
  let kanjiList = shuffleJoyoKanji().slice(0, numOfKanji);
  kanjiList = kanjiList.map((character) => ({
    color: '#FFFFFF',
    counter: 0, // Initialization for counter
    character: character,
  }));

  return kanjiList;
}
