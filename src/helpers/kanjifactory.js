import JOYO_KANJI from './joyokanji';


function getRandomJoyoKanji() {
  const joyoIndex = getRandomInt(0, JOYO_KANJI.length);
  return JOYO_KANJI[joyoIndex];
}


// https://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

// helper to generate test kanji until we connect to db

function kanjiFactory(numOfKanji) {
  // https://github.com/jamesknelson/node-joyo-kanji/blob/master/index.js
  let kanjiList = Array(numOfKanji).fill(1);
  kanjiList = kanjiList.map(() => ({
    character: getRandomJoyoKanji(),
    color: getRandomColor(),
  }));
  return kanjiList;
}

export default kanjiFactory;
