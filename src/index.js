import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { createStore } from 'redux';
import Yaponiya from './Yaponiya';
import registerServiceWorker from './registerServiceWorker';
import { kanjiFactory } from './helpers/utils';
import kanjis from './store/reducers';
import './styles/index.css';

const kanjiMap = kanjiFactory(2136);
let store = createStore(kanjis, kanjiMap);

const mapStateToProps = state => {
  // Initial state
  return state.keySeq()
    .map(key => Map({
      id: key,
      count: state.get(key).get('count'),
      alphabetical: state.get(key).get('alphabetical'),
      heisig: state.get(key).get('heisig'),
      nhk: state.get(key).get('count'),
      isFlash: false
    })).toList();
}

const mapDispatchToProps = 0;

ReactDOM.render(<Yaponiya />, document.getElementById('root'));
registerServiceWorker();
