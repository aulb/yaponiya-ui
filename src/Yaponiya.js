import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import KanjiStore from './components/KanjiStore';
import KanjiPage from './components/KanjiPage';
import Calendar from './components/Calendar';
import Header from './components/Header';

// Endow Header with routing info
const HeaderRouter = withRouter(Header);

const Yaponiya = () => (
  <div>
    <Router>
      <div>
        <HeaderRouter />
        <Route exact path="/" component={KanjiStore} />
        <Route path="/kanji/:character" component={KanjiPage} />
        <Route path="/data/:year/:month" component={KanjiStore} />
        <Route path="/calendar" component={Calendar} />
      </div>
    </Router>
  </div>
);

export default Yaponiya;
