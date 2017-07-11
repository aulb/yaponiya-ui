import { Map } from 'immutable';
// import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';
import { kanjiFactory } from '../helpers/utils';

export default function kanjiReducer(state = Map({
  fetched: false,
  isLoading: false,
  error: false,
  kanjis: kanjiFactory(2136),
}), action = null) {
  switch (action.type) {
    case types.RECEIVE_ERROR:
      return state.set('error', true);
    case types.RECEIVE_COUNTS: {
      const keysToKanji = (acc, kanji) => {
        const count = action.response[kanji];
        return acc.set(kanji, acc.get(kanji).merge({ count }));
      };
      const newKanjis = Object.keys(action.response)
        .filter(key => state.get('kanjis').get(key))
        .reduce(keysToKanji, state.get('kanjis'));
      return state
        .set('kanjis', newKanjis)
        .set('isLoading', false)
        .set('fetched', true);
    }
    case types.REQUEST_DATA:
      return state.set('isLoading', true);
    default:
      return state;
  }
}
