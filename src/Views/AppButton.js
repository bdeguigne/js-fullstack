import React from 'react';
import PropTypes from 'prop-types';

function StartRoundButton({ handleRoundClick, text }) {
  return (
    <button
      className="button-82-pushable"
      type="button"
      onClick={handleRoundClick}
    >
      <span className="button-82-shadow" />
      <span className="button-82-edge" />
      <span className="button-82-front text">{text}</span>
    </button>
  );
}

StartRoundButton.propTypes = {
  handleRoundClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default StartRoundButton;
