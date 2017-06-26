import React from 'react';
import PropTypes from 'prop-types';

function KanjiPage({ match }) {
  const styles = {
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  const kanji = match.params.character;
  return (
    <div style={styles.container}>
      <h1>{kanji}</h1>
    </div>
  );
}

KanjiPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      character: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default KanjiPage;
