import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import KanjiStore from './components/KanjiStore';
import KanjiPage from './components/KanjiPage';
import Calendar from './components/Calendar';
import Header from './components/Header';

const HeaderRouter = withRouter(Header);

const Yaponiya = () => (
  <Router>
    <div>
      <HeaderRouter />
      <Switch>
        <Route exact path="/" component={KanjiStore} />
        <Route path="/kanji/:character" component={KanjiPage} />
        <Route path="/:year/:month" component={KanjiStore} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </div>
  </Router>
);

export default Yaponiya;
