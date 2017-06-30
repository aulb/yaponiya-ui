import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
 * Kanji "class" for each kanji.
 */
function KanjiCharacter({ backgroundColor, fontColor, children, link }) {
  const styles = {
    character: {
      fontSize: '1.0em',
      fontFamily: 'Noto Sans',
      color: fontColor,
    },
    container: {
      backgroundColor,
      display: 'inline-block',
      margin: 1,
      borderRadius: '3px',
    },
  };
  return (
    <div style={styles.container}>
        <span style={styles.character}>{children}</span>
    </div>
  );
}

KanjiCharacter.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default KanjiCharacter;
