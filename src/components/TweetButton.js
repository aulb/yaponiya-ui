import React from 'react';
import PropTypes from 'prop-types';

function TweetButton({ toggleStream, isActive }) {
  return (
    <div
      className={isActive ? 'fa-active' : 'fa-inactive'}
      role="button"
      aria-pressed="true"
      tabIndex={0}
      onClick={toggleStream}
    >
      <i className="fa fa-twitter-square fa-3x" aria-hidden="true" />
    </div>
  );
}

TweetButton.propTypes = {
  toggleStream: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default TweetButton;
