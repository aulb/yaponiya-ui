import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function KanjiCharacter({ backgroundColor, fontColor, kanjiKey }) {
  const styles = {
    character: {
      fontSize: '0.75em',
      fontFamily: 'Noto Sans',
      color: fontColor,
    },
    button: {
      backgroundColor,
      display: 'inline-block',
      padding: 5,
      margin: 2,
      borderRadius: '2px',
      border: 0,
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };
  return (
    <Link style={styles.button} to={`/kanji/${kanjiKey}`}>
      <span style={styles.character}>{ kanjiKey }</span>
    </Link>
  );
}

KanjiCharacter.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  kanjiKey: PropTypes.string.isRequired,
};

export default KanjiCharacter;
