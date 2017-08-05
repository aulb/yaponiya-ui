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
  currentOrder: ORDER.GRADE,
  currentSort: SORT.ASCENDING,
  // Cut down on useless fetches by adding more states
  fetchedOrders: Map(),
}), action = null) {
  switch (action.type) {
    case types.REQUEST_DATA:
      return state.set('isLoading', true);
    case types.RECEIVE_ERROR:
      return state.set('error', true);
    case types.UPDATE_SORT:
      return state.set('currentSort', action.newSort);
    case types.UPDATE_ORDER: {
      // If already set, return immediately
      if (state.get('fetchedOrders').get(action.newOrder)) {
        return state.set('currentOrder', action.newOrder);
      }

      // Push data to whatever our order by currently set as
      // Magic syntax, dynamic assignment to immutable
      const keysToKanji = order => (acc, kanji) => {
        const result = action.response[kanji];
        return acc.set(kanji, acc.get(kanji).merge({ [order]: result }));
      };
      const newKanjis = Object.keys(action.response)
        .filter(key => state.get('kanjis').get(key))
        .reduce(keysToKanji(action.newOrder), state.get('kanjis'));
      const fetchedOrders = state.get('fetchedOrders').merge({ [action.newOrder]: true });

      return state
        .set('kanjis', newKanjis)
        .set('currentOrder', action.newOrder)
        .set('isLoading', false)
        .set('fetched', true)
        .set('fetchedOrders', fetchedOrders);
    }
    default:
      return state;
  }
}
