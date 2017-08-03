import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// class KanjiPage extends Component {
function KanjiPage({ match }) {
  const styles = {
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  const kanji = match.params.character;
  const json = axios({
    url: 'http://reblws.me:5000/api/kanji/' + decodeURIComponent(kanji),
    timeout: 20000,
    method: 'get',
    responseType: 'json',
  }).then((data) => {
    return data;
  });

  return (
    <div style={styles.container}>
      <h1>{kanji}</h1>
    </div>
  );
}
// }

KanjiPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      character: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default KanjiPage;
