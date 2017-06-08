import React from 'react';
import PropTypes from 'prop-types';

function Kanji(props) {
  const style = {
    backgroundColor: props.color,
  };
  return <span style={style}>{props.character}</span>;
}

Kanji.propTypes = {
  color: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Kanji;
