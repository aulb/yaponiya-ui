import React from 'react';
import PropTypes from 'prop-types';

// import APIClient from '../helpers/APIClient';

// class KanjiPage extends Component {
function KanjiPage({ match }) {
  const styles = {
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  const kanji = match.params.character;
  // const json = APIClient
  //   .get(`/kanji/'${decodeURIComponent(kanji)}`)
  //   .then(data => data);

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
