import React from 'react';
import PropTypes from 'prop-types';

function Kanji(props) {
  const style = {
    backgroundColor: props.color,
    fontSize: '1.8em',
    display: 'inline-block',
    margin: 1,
  };
  return <span style={style}>{props.character}</span>;
}

Kanji.propTypes = {
  color: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Kanji;
