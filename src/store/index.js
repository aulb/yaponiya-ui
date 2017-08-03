import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import kanjiReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Need the thunk for async actions
export default createStore(
  kanjiReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
