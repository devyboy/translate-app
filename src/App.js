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
import { Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

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
      languages: [
        "Hindi",
        "Hebrew",
        "Russian",
        "English"
      ],
      currentToLang: 'None',
      currentFromLang: 'English',
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
      let fromCode = '';
      let toCode = '';
      if (this.state.currentToLang === "Hindi") {
        toCode = "hi";
      }
      else if (this.state.currentToLang === "Hebrew") {
        toCode = "he";
      }
      else if (this.state.currentToLang === "Russian") {
        toCode = "ru";
      }
      else if (this.state.currentToLang === "English") {
        toCode = "en";
      }

      if (this.state.currentFromLang === "Hindi") {
        fromCode = "hi";
      }
      else if (this.state.currentFromLang === "Hebrew") {
        fromCode = "he";
      }
      else if (this.state.currentFromLang === "Russian") {
        fromCode = "ru";
      }
      else if (this.state.currentFromLang === "English") {
        fromCode = "en";
      }
      const translated = await translate(text, {from: fromCode, to: toCode }).catch(() => "There was a problem translating. Please try again at a later time.");
      this.state.messages.push([translated, true]);
      scroll.scrollToBottom();
      this.forceUpdate();
    }
  }

  resetShit() {
    let message = "Type something below for me to translate it to " + this.state.currentToLang + " from " + this.state.currentFromLang + ".";
    this.setState({ messages: [message] });
    this.forceUpdate();
  }

  determineStyle(button) {
    if (this.state[button]) {
      return "success";
    }
  }

  determineFlag2() {
    if (this.state.currentToLang === "Hindi") {
      return india;
    }
    else if (this.state.currentToLang === "Hebrew") {
      return israel;
    }
    else if (this.state.currentToLang === "Russian") {
      return russia;
    }
    else if (this.state.currentToLang === "English") {
      return usa;
    }
    else {
      return question;
    }
  }

  determineFlag1() {
    if (this.state.currentFromLang === "Hindi") {
      return india;
    }
    else if (this.state.currentFromLang === "Hebrew") {
      return israel;
    }
    else if (this.state.currentFromLang === "Russian") {
      return russia;
    }
    else if (this.state.currentFromLang === "English") {
      return usa;
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
        <MenuItem style={{ fontSize: '1.5em'}} onClick={() => {this.setState({ currentFromLang: language, enabled: true}); this.state.messages.push(["Translating to " + this.state.currentToLang + " from " + language + ".", true]); this.forceUpdate(); scroll.scrollToBottom({duration: 250})}}>
          {language}
        </MenuItem>
      );
    });

    const listLangs2 = this.state.languages.map((language) => {
      return (
        <MenuItem style={{ fontSize: '1.5em'}} onClick={() => {this.setState({ currentToLang: language, enabled: true}); this.state.messages.push(["Translating to " + language + " from " + this.state.currentFromLang + ".", true]); this.forceUpdate(); scroll.scrollToBottom({duration: 250})}}>
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
              <img src={this.determineFlag1()} className="App-logo" alt="country-flag" />
              <img src={heart} onClick={() => this.resetShit()} className="heart" alt="heart" />
              <img src={this.determineFlag2()} className="App-logo" alt="american-flag" />
            </div>
            <DropdownButton style={{ marginBottom: '1em', fontSize: '1.5em' }} bsStyle="success" title={this.state.currentFromLang}>
              {listLangs}
            </DropdownButton>
            <Button bsStyle="primary" onClick={() => {let tmp = this.state.currentToLang; this.setState({currentToLang: this.state.currentFromLang}); this.setState({currentFromLang: tmp}); this.state.messages.push(["Languages switched.", true]); scroll.scrollToBottom();}} style={{ marginBottom: '1.25em', marginLeft: "1em", marginRight: '1em' }}>
              <Glyphicon glyph="refresh"/>
            </Button>
            <DropdownButton style={{ marginBottom: '1em', fontSize: '1.5em' }} bsStyle="success" title={this.state.currentToLang}>
              {listLangs2}
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
