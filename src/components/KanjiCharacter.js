import React from 'react';
import PropTypes from 'prop-types';
import { FLASH_COLOR } from '../helpers/constants';
// import { Link } from 'react-router-dom';

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
      },
    };

    return (
      <div style={styles.button}>
        <span style={styles.character}>{children}</span>
      </div>
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
