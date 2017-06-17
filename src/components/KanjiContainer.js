import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';

/*
 * Get color from a predefined list.
 test() {
   const a = Object.keys(this.state.kanjiList).map((kanji) => {
     return Object.assign({},this.state.kanjiList[kanji], { kanji })
   });
   console.log(a);
 }
 */



function KanjiContainer(props) {
  let kanjiJSXList = Array(props.numOfKanji);

  Object.keys(props.kanjiList).map((character) => {
    let currentKanjiProp = props.kanjiList[character];
    kanjiJSXList[currentKanjiProp.position] = (
      <Kanji
        character={character}
        color={currentKanjiProp.color}
        key={character}
      />
    );
  });

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.object.isRequired,
  numOfKanji: PropTypes.number,
};

export default KanjiContainer;
