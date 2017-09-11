import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  link: {
    position: 'relative',
    top: -45,
  },
  nav: {
    textAlign: 'right',
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
    };
  }

  render() {
    const { location } = this.props;

    const linkBack = this.links.back;
    return (
      <div style={styles.container}>
        <header>
          <h1 className="header__title"><Link to="/">やぽにや</Link></h1>
        </header>
        <nav style={styles.nav}>
          {
            location.pathname !== '/' ?
              <Link style={styles.link} to={linkBack.path}>
                &#8617; back
              </Link>
            : null
          }
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
