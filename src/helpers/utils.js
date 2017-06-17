import { JOYO_KANJI, OPTIONS, ORDERS } from './constants';

/*
 * Creates a copy of the array and shuffles its content in place.
 */
function shuffleInPlace(arr) {
  // Duplicate our original list, spread is .slice()
  const arrCopy = [...arr];
  // Swapping the good old way is fast and legible
  let tempCharacter = null;
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    j = getRandomInt(0, arrCopy.length);
    tempCharacter = arrCopy[i];
    arrCopy[i] = arrCopy[j];
    arrCopy[j] = tempCharacter;
  }
  return arrCopy
}

/*
 * Generates a random integer between an interval.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

/*
 * Initializes an empty KanjiList object
 */
export function kanjiFactory(numOfKanji, order = 'Alphabetical') {
  // Fast lookup for updating
  let kanjiList = {};

  // Decides ordering
  let orderArr = ORDERS.ALPHABETICAL;
  switch (order) {
    case OPTIONS.RANDOM:
      orderArr = shuffleInPlace(orderArr);
      break;
    default:
      break;
  }

  for (let i = 0; i < numOfKanji; i++) {
    let currentCharacter = JOYO_KANJI[orderArr[i]];
    kanjiList[currentCharacter] = {
      counter : 0,
      color   : '#FFFFFF',
      position: i,
    }
  }

  return kanjiList;
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
