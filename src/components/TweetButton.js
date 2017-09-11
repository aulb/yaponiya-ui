import React from 'react';
import PropTypes from 'prop-types';

function TweetButton({ toggleStream, isActive }) {
  return (
    <div className="button-stack">
      <div
        className={isActive ? 'fa-active' : 'fa-inactive'}
        role="button"
        aria-pressed="true"
        tabIndex={0}
        onClick={toggleStream}
      >
        <i className="fa fa-twitter fa-2x" aria-hidden="true" />
      </div>
    </div>
  );
}

TweetButton.propTypes = {
  toggleStream: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default TweetButton;
