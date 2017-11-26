import React, { Component } from 'react';
import logo from './japan.svg';
import lotion from './fuckingpicture.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              ろしゃんです
            </h1>
          </header>
          <p className="App-intro">
            おねがいします
          </p>
          <img src={lotion} className="Lotion-picture"/>
        </div>
    );
  }
}

export default App;
