import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
 * Kanji "class" for each kanji.
 */
function KanjiCharacter({ backgroundColor, fontColor, children }) {
  const styles = {
    character: {
      fontSize: '1.0em',
      fontFamily: 'Noto Sans',
      color: fontColor,
      textDecoration: 'none',
    },
    button: {
      backgroundColor,
      display: 'inline-block',
      padding: 10,
      margin: 5,
      borderRadius: '3px',
      border: 0,
      cursor: 'grab', // 'pointer'
    },
  };

  // TODO: Continue progress...
  return (
    <button style={styles.button}>
      <Link style={styles.character} to={`/kanji/${children}`}>{children}</Link>
    </button>
  );
}

KanjiCharacter.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  // link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default KanjiCharacter;
