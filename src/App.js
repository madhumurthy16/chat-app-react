import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
    constructor(props) {
      super(props);

      this.state = {
        activeRoom: '',
        user: ''
      };
    }

    handleRoomClick (room) {
      this.setState({activeRoom:room});
    }

    setUser(user) {
      this.setState({user:user});
    }
    
    render() {
      return (
        <div className="App">
          <h1>Welcome to Chat App</h1>
          <RoomList handleRoomClick={this.handleRoomClick.bind(this)}
            firebase = {firebase}
            activeRoom = {this.state.activeRoom} />
           <MessageList
              firebase = {firebase}
              activeRoom = {this.state.activeRoom} /> 
            <User setUser={this.setUser.bind(this)}
              firebase = {firebase} />  
        </div>
      );
    }
  }

export default App;
