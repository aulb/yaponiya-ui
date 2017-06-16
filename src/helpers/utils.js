import { JOYO_KANJI } from './constants';

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
  let kanjiList = JOYO_KANJI.slice(0, numOfKanji); // shuffleJoyoKanji().slice(0, numOfKanji);
  let kanjiState = {};
  for (let i = 0; i < kanjiList.length; i++) {
    let currentCharacter = kanjiList[i];
    kanjiState[currentCharacter] = {
      counter: 0,
      color: '#FFFFFF'
    }
  }

  return kanjiState;
}

export function getMaxCounter(obj) {
  const largestKey = (max, current) => (
    obj[max] > obj[current]
      ? max
      : current
  );
  const maxKey = Object.keys(obj).reduce(largestKey);
  return obj[maxKey];
}
