import { Map } from 'immutable';
import { JOYO_KANJI, OPTIONS } from './constants';
import { ORDERS } from './orders';
import { mockData } from './mock';


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
  return arrCopy;
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
export function kanjiFactory(numOfKanji) {
  let kanjiMap = Map({});

  // Decides ordering
  const orderArr = ORDERS.ALPHABETICAL;

  for (let i = 0; i < numOfKanji; i++) {
    const currentChar = JOYO_KANJI[orderArr[i]];
    kanjiMap = kanjiMap.set(currentChar, Map({
      alphabetical: ORDERS.ALPHABETICAL[i],
      heisig: ORDERS.HEISIG[i],
      frequency: ORDERS.FREQUENCY[i],
      count: 0,
    }));
  }
  return kanjiMap;
}

export function getMaxCounter(array) {
  const largest = (max, current) => (
    max.count > current.count
      ? max
      : current
  );
  return array.reduce(largest, { count: 0 });
}
