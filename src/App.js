import React, { Component } from 'react';
import japan from './images/japan.svg';
import usa from './images/usa.svg';
import heart from './images/heart.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
    english: true,
    };
  }

  determineLang() {
    if (this.state.english) {
      return (
          <img src={usa} className="lang-logo" alt="american-flag" />
      );
    }
    else {
      return (
        <img src={japan} className="lang-logo" alt="japanese-flag" />
      );
    }
  }

  handleLangChange() {
   if (this.state.english) {
     this.setState({ english: false });
   }
   else {
     this.setState({ english: true });
   }
  }

  renderEverything() {
    if (this.state.english) {
      return (
        <div className="App">
          <div onClick={() => this.handleLangChange()} class="navbar">
            {this.determineLang()}
          </div>
          <div className="App-header">
            <div className="frick">
              <img src={japan} className="App-logo" alt="japanese-flag" />
              <img src={heart} className="heart" alt="heart" />
              <img src={usa} id="amerikuh" className="App-logo" alt="american-flag" />
              <h1 className="App-title">
                デラウェア大学へようこそ！
              </h1>
            </div>
          </div>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>
          <p className="App-intro">
            友達の選考わかりません。選考はなんですか？お名前はなんですか？名前はデブンです。アメリカ人です。
          </p>

        </div>
      );
    }
    else {
      return (
        <div className="App">
          <div onClick={() => this.handleLangChange()} class="navbar">
            {this.determineLang()}
          </div>
          <div className="App-header">
            <div className="frick">
              <img src={japan} className="App-logo" alt="japanese-flag" />
              <img src={heart} className="heart" alt="heart" />
              <img src={usa} id="amerikuh" className="App-logo" alt="american-flag" />
              <h1 className="App-title">
                Welcome to the University of Delaware！
              </h1>
            </div>
          </div>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>
          <p className="App-intro">
            I do not understand my friend's selection. What is screening? What is your name? The name is Den. I am American.
          </p>

        </div>
      );
    }

  }
  render() {
    return (
        this.renderEverything()
    );
  }
}

export default App;
