import React, { Component } from 'react';
import israel from './images/israel.svg';
import russia from './images/russia.svg';
import india from './images/india.svg';
import question from './images/question.svg';
import usa from './images/usa.svg';
import heart from './images/heart.png';
import { Card } from './components/Card.js';
import './App.css';
import { animateScroll as scroll } from 'react-scroll';

import translate from './modules/translate/src/index.js';
import { DropdownButton, MenuItem } from 'react-bootstrap';

translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20180410T212010Z.38d52b4f48bd4d51.a3d45adb4f82949b168d39ca99dd118a6520a870';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      english: true,
      value: '',
      messages: [
          //["Hello! We are Nihongo Table, a club on campus that is centered around Japan and Japanese culture.", true],
          ["Select a language above to start translating!", true]
      ],
      Hindi: false,
      Hebrew: false,
      Russian: false,
      languages: [
        "Hindi",
        "Hebrew",
        "Russian",
      ],
      currentLang: 'None',
      enabled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetShit = this.resetShit.bind(this);
    this.renderEverything = this.renderEverything.bind(this);

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {
    }
    else {
      this.state.messages.push([this.state.value, false]);
      this.setState({ value: ''})
      scroll.scrollToBottom({duration: 200});
      const text = this.state.value;
      let transCode = '';
      if (this.state.currentLang === "Hindi") {
        transCode = "hi";
      }
      else if (this.state.currentLang === "Hebrew") {
        transCode = "he";
      }
      else if (this.state.currentLang === "Russian") {
        transCode = "ru";
      }
      const translated = await translate(text, {to: transCode });
      this.state.messages.push([translated, true]);
      this.forceUpdate();
    }
  }

  resetShit() {
    let message = "Type something below for me to translate it to " + this.state.currentLang + ".";
    this.setState({ messages: [message] });
    this.forceUpdate();
  }

  determineStyle(button) {
    if (this.state[button]) {
      return "success";
    }
  }

  determineFlag() {
    if (this.state.currentLang === "Hindi") {
      return india;
    }
    else if (this.state.currentLang === "Hebrew") {
      return israel;
    }
    else if (this.state.currentLang === "Russian") {
      return russia;
    }
    else {
      return question;
    }
  }

  determinePlaceholder() {
    if (!this.state.enabled) {
      return "Please select a language first.";
    }
    else {
      return "Enter what you want to translate.";
    }
  }



  renderEverything() {
    const listLangs = this.state.languages.map((language) => {
      return (
        <MenuItem style={{ fontSize: '1.5em'}} onClick={() => {this.setState({ currentLang: language, enabled: true}); this.state.messages.push(["Language changed to " + language + ".", true]); scroll.scrollToBottom({duration: 250})}}>
          {language}
        </MenuItem>
      );
    });

    const listItems = this.state.messages.map((message, index) => {
      if (message[1]) {
        if (index === this.state.messages[this.state.messages.length - 1]) {
          let props = { text: message, class: 'App-intro-last' };
          return (
            <Card>
              {props}
            </Card>);
        }
        else {
          let props = { text: message, class: 'App-intro' };
          return (
            <Card>
              {props}
            </Card>);
        }
      }
      else {
        let props = { text: message, class: 'fromUser' };
        return (
          <Card>
            {props}
          </Card>);
      }
  });
      return (
        <div className="App">
          <form autoComplete="off" className="navbar2" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} className="message" value={this.state.value} disabled={!this.state.enabled} placeholder={this.determinePlaceholder()} type="submit, text" name="message"></input>
          </form>
          <div className="App-header">
            <div className="frick">
              <h1 className="App-title">
                Welcome to the Translator App
              </h1>
              <img src={this.determineFlag()} className="App-logo" alt="country-flag" />
              <img src={heart} onClick={() => this.resetShit()} className="heart" alt="heart" />
              <img src={usa} id="amerikuh" className="App-logo" alt="american-flag" />
            </div>
            <DropdownButton style={{ marginBottom: '1em', fontSize: '1.5em' }} bsStyle="success" title={this.state.currentLang}>
              {listLangs}
            </DropdownButton>
          </div>
          <div className="messages-container">
            {listItems}
          </div>
          <div ref={el => { this.el = el; }} />
        </div>
      );
  }

  render() {
    return (
        this.renderEverything()
    );
  }
}

export default App;
