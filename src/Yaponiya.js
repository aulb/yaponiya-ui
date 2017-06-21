import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Calendar from './components/Calendar';
import KanjiStore from './components/KanjiStore';
import Header from './components/Header';

const Yaponiya = () => (
  <div>
    <nav>
      <Header />
    </nav>
    <Router>
      <Switch>
        <Route exact path="/" component={KanjiStore} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </Router>
  </div>
);

export default Yaponiya;
