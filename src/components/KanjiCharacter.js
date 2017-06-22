import React from 'react';
import PropTypes from 'prop-types';

/*
 * Kanji "class" for each kanji.
 */
function KanjiCharacter({ color, character }) {
  const style = {
    backgroundColor: color,
    fontSize: '1.0em',
    fontFamily: 'Noto Sans',
    display: 'inline-block',
    margin: 1,
    borderRadius: '3px',
  };
  return <span style={style}>{character}</span>;
}

KanjiCharacter.propTypes = {
  color: PropTypes.string.isRequired,
  // counter: PropTypes.number,
  character: PropTypes.string.isRequired,
};

export default KanjiCharacter;
