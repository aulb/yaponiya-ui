import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import kanjiReducer from '../reducers';

// Need the thunk for async actions
export default createStore(
  kanjiReducer,
  applyMiddleware(
    thunkMiddleware,
  ),
);
