import React from 'react';
import PropTypes from 'prop-types';
import Kanji from './Kanji';


function KanjiContainer(props) {
  const kanjiJSXList = props.kanjiList.map(kanjiObject => (
    <Kanji
      character={kanjiObject.character}
      color={kanjiObject.color}
    />
  ));

  return (
    <div className="kanjiContainer">
      { kanjiJSXList }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
