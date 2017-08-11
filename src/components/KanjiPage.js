import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KanjiReading from '../components/KanjiReading';
import KanjiMeaning from '../components/KanjiMeaning';
import KanjiInformation from '../components/KanjiInformation';
import KanjiStroke from '../components/KanjiStroke';

import { getDataFromLocalStorage, saveDataToLocalStorage } from '../helpers/localStorage';

// TODO: Implement Kanji Page
// Make it look like Kanji Recognizer
import APIClient from '../helpers/APIClient';
// Save data to local storage

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

// class KanjiPage extends Component {
class KanjiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kanji: this.props.match.params.character,
      // https://daveceddia.com/watch-out-for-undefined-state/
      // Initialize all the necessary states
      data: {
        reading: {},
        meaning: [],
        jlpt: 0,
        grade: 0,
        stroke_count: 0,
      },
      strokeXML: '',
    };
  }

  // https://github.com/reactjs/react-redux/issues/129
  componentDidMount() {
    // Ok to ignore no-set-state in componentDidMount for now
    // https://github.com/airbnb/javascript/issues/684
    if (!this.fetchDataFromLocalStorage()) this.fetchDataFromApi();
  }

  fetchDataFromLocalStorage() {
    const kanji = this.state.kanji;
    const cachedData = getDataFromLocalStorage(kanji);
    const cachedStroke = getDataFromLocalStorage(`stroke:${kanji}`);

    if (cachedData && cachedStroke) {
      this.setState({
        data: cachedData,
        strokeXML: cachedStroke,
      });
      return true;
    }
    return false;
  }

  // Fetching data is only active once during the entire lifecycle
  fetchDataFromApi() {
    const kanji = this.state.kanji;
    const decodedKanji = decodeURIComponent(kanji);
    let data = null;
    let strokeXML = '';

    const getData = APIClient
      .get(`/kanji/${decodedKanji}`)
      .then((result) => {
        data = result.data;
      });

    const getStroke = APIClient
      .get(`/stroke/${decodedKanji}`)
      .then((result) => {
        strokeXML = result.data;
      });

    Promise.all([getData, getStroke])
      .then(() => {
        saveDataToLocalStorage(kanji, data);
        saveDataToLocalStorage(`stroke:${kanji}`, strokeXML);

        this.setState({
          data,
          strokeXML,
        });
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>{this.state.kanji}</h1>
        <KanjiInformation
          jlpt={this.state.data.jlpt}
          grade={this.state.data.grade}
          stroke_count={this.state.data.stroke_count}
        />
        <KanjiMeaning
          meaning={this.state.data.meaning}
        />
        <KanjiReading
          reading={this.state.data.reading}
        />
        <KanjiStroke
          kanji={this.state.kanji}
          strokeXML={this.state.strokeXML}
        />
      </div>
    );
  }
}

KanjiPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      character: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default KanjiPage;
