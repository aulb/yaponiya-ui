import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    textAlign: 'center',
  },
  nav: {
    textAlign: 'right',
  },
  link: {
    position: 'relative',
    top: -45,
  },
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>やぽにや</h1>
      </header>
      <nav style={styles.nav}>
        <Link style={styles.link} to={linkBack.path}>
          {linkBack.name}
        </Link>
      </nav>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
