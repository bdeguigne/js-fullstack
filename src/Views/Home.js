import React from "react";
import logo from "../logo.svg"
import { connect } from "react-redux";

function Home(props) {

   return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      
      <p>Welcome, {props.sample.name}</p>
    
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
   ) 
}

const mapStateToProps = state => ({
    sample: state.sample
  });

export default connect(mapStateToProps)(Home);