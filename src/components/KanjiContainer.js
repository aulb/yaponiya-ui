import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import KanjiCharacter from './KanjiCharacter';

/*
 * Get color from a predefined list.
 */
function KanjiContainer({ kanjiList }) {
  const kanjiCharacters = kanjiList.map(kanji => {
    const link = `/kanji/${kanji.id}`;
    return (
      <Link to={link}>
        <KanjiCharacter
          character={kanji.id}
          color={kanji.color}
          key={kanji.id}
        />
      </Link>
    );
  });

  return (
    <div>
      { kanjiCharacters }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
