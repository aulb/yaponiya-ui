import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { store } from './store';
import KanjiStore from './components/KanjiStore';
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
          <Route exact path="/" component={KanjiStore} />
          <Route path="/kanji/:character" component={KanjiPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default Yaponiya;
