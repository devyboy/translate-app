import React, { Component } from 'react';
import japan from './images/japan.svg';
import usa from './images/usa.svg';
import heart from './images/heart.png';
import lotion from './images/ineedtobemorecarefulwithmyfilenames.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={japan} className="App-logo" alt="japanese-flag" />
              <img src={heart} className="heart" alt="heart" />
            <img src={usa} id="amerikuh" className="App-logo" alt="american-flag" />
            <h1 className="App-title">
              デラウェア大学へようこそ！
            </h1>
          </header>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
        </p>
          <img src={lotion} className="Lotion-picture" alt="lotion"/>
        </div>
    );
  }
}

export default App;
