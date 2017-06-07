import React, { Component } from 'react';
import Kanji from './Kanji';

function KanjiContainer(props) {
  const kanjiJSXList = props.kanjiList.map(kanjiObject => (
      <Kanji character={kanjiObject.character} color={kanjiObject.color} />
  ));

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

export default KanjiContainer;
