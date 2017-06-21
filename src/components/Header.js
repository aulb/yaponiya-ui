import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = {
  textAlign: 'center',
};

const links = {
  back: { name: 'Back', path: '/' },
  calendar: { name: 'Calendar', path: '/calendar' },
};

function Header({ location }) {
  const linkBack = location.pathname === '/'
    ? links.calendar
    : links.back;

  return (
    <div>
      <header style={style}>
        <h1>やぽにや</h1>
        <nav>
          <Link to={linkBack.path}>{linkBack.name}</Link>
        </nav>
      </header>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Header;
