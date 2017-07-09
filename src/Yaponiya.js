import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import KanjiStore from './components/KanjiStore';
import KanjiPage from './components/KanjiPage';
import Header from './components/Header';

const HeaderRouter = withRouter(Header);

const Yaponiya = () => (
  <Router>
    <div>
      <HeaderRouter />
      <Switch>
        <Route exact path="/" component={KanjiStore} />
        <Route path="/kanji/:character" component={KanjiPage} />
      </Switch>
    </div>
  </Router>
);

export default Yaponiya;
