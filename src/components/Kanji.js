import React from 'react';
import PropTypes from 'prop-types';

// color actually is int, for hue

function Kanji(props) {

  const style = {
    backgroundColor: props.color,
    fontSize: '1.8em',
    fontFamily: 'Noto Sans',
    display: 'inline-block',
    margin: 1,
    borderRadius: '3px',
  };
  return <span style={style}>{props.character}</span>;
}

Kanji.propTypes = {
  color: PropTypes.string,
  counter: PropTypes.number,
  character: PropTypes.string.isRequired,
};

export default Kanji;
