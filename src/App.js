import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3kZiZ8vmr3crDUSsAt2kIW7h9mgL5ry8",
    authDomain: "chat-app-reactjs-01.firebaseapp.com",
    databaseURL: "https://chat-app-reactjs-01.firebaseio.com",
    projectId: "chat-app-reactjs-01",
    storageBucket: "chat-app-reactjs-01.appspot.com",
    messagingSenderId: "755641744534"
  };
  firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to Chat App</h1>
        <RoomList 
          firebase = {firebase} />
      </div>
    );
  }
}

export default App;
