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


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPath: '/',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location });
    }
  }

  get links() {
    return {
      back: { name: 'Back', path: this.state.prevPath },
      calendar: { name: 'Calendar', path: '/calendar' },
    };
  }

  render() {
    const { location } = this.props;

    const onDataPage = location.pathname.includes('data')
      || location.pathname === '/';

    const linkBack = onDataPage
      ? this.links.calendar
      : this.links.back;

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
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
