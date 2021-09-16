import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

function Home({ sample }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome, {sample.name}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

Home.propTypes = {
  sample: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  sample: state.sample,
});

export default connect(mapStateToProps)(Home);
