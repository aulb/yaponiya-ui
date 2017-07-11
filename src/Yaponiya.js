import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import KanjiCatalogContainer from './containers/KanjiCatalogContainer';
import KanjiPage from './components/KanjiPage';
import Header from './components/Header';

const HeaderRouter = withRouter(Header);

// Handle network requests here and then dispatch

const Yaponiya = () => (
  <Provider store={store}>
    <Router>
      <div>
        <HeaderRouter />
        <Switch>
          <Route exact path="/" component={KanjiCatalogContainer} />
          <Route path="/kanji/:character" component={KanjiPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default Yaponiya;
