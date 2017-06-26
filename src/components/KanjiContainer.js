import React from 'react';
import PropTypes from 'prop-types';
import KanjiCharacter from './KanjiCharacter';


function KanjiContainer({ kanjiList }) {
  const largestCount = kanjiList.reduce((max, current) => (
    max.count > current.count
      ? max
      : current
  ), { count: 0 }).count;

  const kanjiCharacters = kanjiList.map((kanji) => {
    const pct = (kanji.count / largestCount) * 100;
    const link = `/kanji/${kanji.id}`;
    const color = `hsl(270, ${pct}%, 100%)`;
    return (
      <KanjiCharacter
        character={kanji.id}
        color={color}
        link={link}
        key={kanji.id}
      />
    );
  });

  return (
    <div>
      { kanjiCharacters }
    </div>
  );
}

KanjiContainer.propTypes = {
  kanjiList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KanjiContainer;
