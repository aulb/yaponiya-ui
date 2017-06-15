import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import KanjiContainer from './KanjiContainer';
import Options from './Options';
import Header from './Header';
import '../styles/KanjiLayout.css';
import { kanjiFactory } from '../helpers/utils';
import { OPTIONS } from '../helpers/constants';
import { color } from '../helpers/colors';

/* Determine the character's color and initial counter
 * in the kanjiFactory.
 */
const KANJI_LIST = kanjiFactory(1000);
const mockData = {
  '日': 6,
  '要': 1,
  '運': 5,
  '彼': 1,
  '雨': 2,
  '一': 2,
  '鳥': 1,
  '東': 1,
  '京': 1,
  '光': 3,
  '明': 1,
  '大': 5,
  '気': 2,
  '間': 1,
  '感': 7,
  '漢': 1,
  '字': 3,
  '髪': 9,
  '毛': 10,
  '時': 1,
  '寺': 1,
  '度': 1,
  '子': 1,
  '供': 5,
  '選': 3,
  '択': 2,
  '駅': 1,
  '馬': 1,
  '牛': 3,
  '猫': 1,
  '会': 3,
  '社': 2,
  '学': 1,
  '生': 1,
  '先': 1,
  '潤': 1,
  '滑': 3,
  '骨': 1,
  '未': 1,
  '来': 1,
  '空': 1,
  '田': 1
};

function getMaxCounter() {
  let biggestCounter = 0;
  for (let property in mockData) {
    if (biggestCounter < mockData[property]) {
      biggestCounter = mockData[property];
    }
  }
  return biggestCounter;
}

class KanjiStore extends Component {
  constructor(props) {
    super(props); // What does this do? <-- lets you call this.props in constructor
    this.state = {
      currentOrder: '',
      kanjiList: KANJI_LIST,
    };

    // Need to remember which function we passed in
    this.switchOrder = this.switchOrder.bind(this);
    this.updateKanji = this.updateKanji.bind(this);
  }

  updateKanji() {
    const kanjiUpdate = [...this.state.kanjiList];
    const biggestCounter = getMaxCounter(mockData);
    console.log(biggestCounter);
    for (let i = 0; i < kanjiUpdate.length; i++) {
      let currentKanjiObject = kanjiUpdate[i];
      let currentCharacter = currentKanjiObject.character;
      if (mockData.hasOwnProperty(currentCharacter)) {
        // If exist, update the counter
        let currentCounter = mockData[currentCharacter];
        let colorIndex = Math.floor(currentCounter / biggestCounter * color.length);
        currentKanjiObject.counter = currentCounter;
        currentKanjiObject.color = color[colorIndex];
        console.log(mockData[currentCharacter]);
      }
    }

    this.setState({ kanjiList: kanjiUpdate });
  }

  get kanjiList() {
    return this.state.kanjiList;
  }

  switchOrder(event) {
    const nextOrder = event.target.value;
    this.setState({ currentOrder: nextOrder });
  }

  render() {
    return (
      <div className="week-container">
        <div className="top-area">
          <Header />
          <Options
            currentOrder={this.state.currentOrder}
            switchOrder={this.updateKanji}
            possibleOptions={OPTIONS}
          />
        </div>
        <KanjiContainer kanjiList={this.kanjiList} />
      </div>
    );
  }
}

export default KanjiStore;
