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

    // Binding functions

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetShit = this.resetShit.bind(this);
    this.renderEverything = this.renderEverything.bind(this);

  }

  // Handles text box input. When the value is changed, puts the new value into this.state.value

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Handles submitting the text and translating it.

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {  // If the input is empty, don't do anything
    }
    else {
      this.state.messages.push([this.state.value, false]); // Else, push what the user typed to the message array in this.state.messages. The boolean value determines if the message is sent from the user or the app.
      this.setState({ value: ''}) // Empty the text box
      scroll.scrollToBottom({duration: 200}); // Scroll to the bottom of the page to show the newest message
      const text = this.state.value; // Get the text from the box and put it into a variable
      let fromCode = ''; // Determining which languages to translate from and to
      let toCode = '';
      if (this.state.currentToLang === "Hindi") { // currenLang is set when the user selects a language from the dropdown menus below
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

      // Using the npm package called translate which uses a promise function that takes the text to be translated,-
      // the code for the origin and target languages. If there are any errors, the catch statement turns the message into a generic error

      const translated = await translate(text, {from: fromCode, to: toCode }).catch(() => "There was a problem translating. Please try again at a later time.");
      this.state.messages.push([translated, true]); // Push the message to the message array, this time true because it's from the app
      scroll.scrollToBottom();
      this.forceUpdate(); // Force an update to show the new changes
    }
  }

  // Resets the chat and clears all the messages

  resetShit() {
    let message = "Type something below for me to translate it to " + this.state.currentToLang + " from " + this.state.currentFromLang + ".";
    this.setState({ messages: [message] }); // Instead of pushing a message to the array, it resets the array because we just want it to display one message.
    this.forceUpdate();
  }

  // Small helper function to determine which flags to display at the top. Returns a variable that references an svg in the images directory.

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
      return question; // If no country is specified, use a question mark
    }
  }

  // Same as above but for the first flag

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

  // Determines the placeholder text for the input at the bottom. The text tells the user to select a language before they can start. When a user selects a language, this.state.enabled gets set to true and the placeholder changes

  determinePlaceholder() {
    if (!this.state.enabled) {
      return "Please select a language first.";
    }
    else {
      return "Enter what you want to translate.";
    }
  }


  // Renders all the site content


  renderEverything() {
    const listLangs = this.state.languages.map((language) => { // For the first dropdown. Takes the array of languages in the state with the language as a parameter, and returns an array of MenuItems in the listLangs variable for the dropdown menus.
      return (
        // When the menu item with the language is clicked, the currentFromLang is set to that language, the text box is enabled, a message notifying the user of the change is pushed to the screen, and the screen is scrolled down to show it.
        <MenuItem style={{ fontSize: '1.5em'}} onClick={() => {this.setState({ currentFromLang: language, enabled: true}); this.state.messages.push(["Translating to " + this.state.currentToLang + " from " + language + ".", true]); this.forceUpdate(); scroll.scrollToBottom({duration: 250})}}>
          {language}
        </MenuItem>
      );
    });

    // Same as above except for the second dropdown box and sets the currentToLang
    const listLangs2 = this.state.languages.map((language) => {
      return (
        <MenuItem style={{ fontSize: '1.5em'}} onClick={() => {this.setState({ currentToLang: language, enabled: true}); this.state.messages.push(["Translating to " + language + " from " + this.state.currentFromLang + ".", true]); this.forceUpdate(); scroll.scrollToBottom({duration: 250})}}>
          {language}
        </MenuItem>
      );
    });

    // This function takes in the array of messages and turns them into the actual messages on the screen by sending them to the Card component

    const listItems = this.state.messages.map((message, index) => {
      if (message[1]) { // If the message's second parameter is true, that means it's from the computer
        if (index === this.state.messages[this.state.messages.length - 1]) { // If it's the last message in the array...
          let props = { text: message, class: 'App-intro-last' }; // ...give it a different style which pretty much adds more margin on the bottom so it's not covered by the text box at the bottom.
          return ( // Set a variable called props to hold the message and the class, when it's sent to Card.js
            <Card>
              {props}
            </Card>);
        }
        else {
          let props = { text: message, class: 'App-intro' }; // If it isn't the last message but is still from the app and not the user, just make it come from the left and be grey
          return (
            <Card>
              {props}
            </Card>);
        }
      }
      else {
        let props = { text: message, class: 'fromUser' }; // Else, if the message is from the user and not the app, make it green and coming from the right
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
                Click the heart to clear messages
              </h1>
              <img src={this.determineFlag1()} className="App-logo" alt="country-flag" />
              <img src={heart} onClick={() => this.resetShit()} className="heart" alt="heart" />
              <img src={this.determineFlag2()} className="App-logo" alt="american-flag" />
            </div>
            <DropdownButton style={{ marginBottom: '1em', fontSize: '1.5em' }} bsStyle="success" title={this.state.currentFromLang}>
              {listLangs}
            </DropdownButton>
            <Button bsStyle="primary" onClick={() => {let tmp = this.state.currentToLang; this.setState({currentToLang: this.state.currentFromLang}); this.setState({currentFromLang: tmp}); this.state.messages.push(["Languages switched.", true]); scroll.scrollToBottom();}} style={{ marginBottom: "1.25em", marginLeft: "1em", marginRight: '1em' }}>
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
