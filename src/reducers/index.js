import { Map } from 'immutable';
import * as types from '../actions/actionTypes';
import kanjiFactory from '../helpers/kanjiFactory';
import { ORDER, SORT } from '../helpers/constants';

export default function kanjiReducer(state = Map({
  // Here we set all the default value
  fetched: false,
  isLoading: false,
  error: false,
  kanjis: kanjiFactory(2136),
  // The app needs to take in ORDER BY <order> <ASC/DESC>
  currentOrderBy: ORDER.HEISIG,
  currentSort: SORT.ASCENDING,
}), action = null) {
  switch (action.type) {
    case types.UPDATE_SORT:
      return state.set('currentSort', action.newSort);
    case types.REQUEST_DATA:
      return state.set('isLoading', true);
    case types.RECEIVE_ERROR:
      return state.set('error', true);
    case types.RECEIVE_COUNTS: {
      // TODO ordering still doesn't work
      const keysToKanji = (acc, kanji, order='heisig') => {
        const count = action.response[kanji];
        // Push data to whatever our order by currently set as
        return acc.set(kanji, acc.get(kanji).merge({ [order]: count }));
      };
      const newKanjis = Object.keys(action.response)
        .filter(key => state.get('kanjis').get(key))
        .reduce(keysToKanji, state.get('kanjis'));
      return state
        .set('kanjis', newKanjis)
        .set('isLoading', false)
        .set('fetched', true);
    }
    default:
      return state;
  }
}
