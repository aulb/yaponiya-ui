import JOYO_KANJI from './constants';


// Shuffle in place, but create a copy
function shuffleJoyoKanji() {
  // Duplicate our original list, spread is .slice()
  const kanjiList = [...JOYO_KANJI];
  // Swapping the good old way is fast and legible
  let tempCharacter = null;
  let j = 0;
  for (let i = 0; i < JOYO_KANJI.length; i++) {
    j = getRandomInt(0, JOYO_KANJI.length);
    tempCharacter = kanjiList[i];
    kanjiList[i] = JOYO_KANJI[j];
    kanjiList[j] = tempCharacter;
  }
  return kanjiList;
}

// This is prone to duplicate kanjis
function getRandomJoyoKanji() {
  const joyoIndex = getRandomInt(0, JOYO_KANJI.length);
  return JOYO_KANJI[joyoIndex];
}


// https://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Figure out some way to generate gradient
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

// helper to generate test kanji until we connect to db
export function kanjiFactory(numOfKanji) {
  // https://github.com/jamesknelson/node-joyo-kanji/blob/master/index.js
  // Get random JOYO_KANJI
  let kanjiList = shuffleJoyoKanji().slice(0, numOfKanji);
  kanjiList = kanjiList.map((character) => ({
    character: character,
    color: getRandomColor(),
  }));

  return kanjiList;
}
