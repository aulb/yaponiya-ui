import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
 * Kanji "class" for each kanji.
 */
function KanjiCharacter({ color, character, link }) {
  const styles = {
    character: {
      fontSize: '1.0em',
      fontFamily: 'Noto Sans',
    },
    container: {
      color,
      display: 'inline-block',
      margin: 1,
      borderRadius: '3px',
    },
  };
  return (
    <div style={styles.container}>
      <Link to={link}>
        <span style={styles.character}>{character}</span>
      </Link>
    </div>
  );
}

KanjiCharacter.propTypes = {
  color: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default KanjiCharacter;
