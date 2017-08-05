import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FLASH_COLOR } from '../helpers/constants';

class KanjiCharacter extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !this.props.fetched || nextProps.isFlash || this.props.backgroundColor === FLASH_COLOR;
  }

  render() {
    const {
      backgroundColor,
      fontColor,
      children,
    } = this.props;

    const styles = {
      character: {
        fontSize: '1.0em',
        fontFamily: 'Noto Sans',
        color: fontColor,
      },
      button: {
        backgroundColor,
        display: 'inline-block',
        padding: 10,
        margin: 5,
        borderRadius: '3px',
        border: 0,
        cursor: 'pointer',
        textDecoration: 'none',
      },
    };

    return (
      <Link style={styles.button} to={ `/kanji/${children}` }>
        <span style={styles.character}>{children}</span>
      </Link>
    );
  }
}

KanjiCharacter.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
};

export default KanjiCharacter;
