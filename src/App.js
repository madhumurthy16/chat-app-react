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
        user: null
      };
    }

    setUser(user) {
      this.setState({user:user});
    }

    handleRoomClick (room) {
      this.setState({activeRoom:room});
    }

    render() {
      return (
        <div className="App">

          <nav>
            <h1 id="logo">ChatterBox</h1>
            <User 
              firebase = {firebase}  
              setUser = {this.setUser.bind(this)}
              user = {this.state.user} />
          </nav>
          <div className="content-wrapper">
            <aside className="sidebar">
              <RoomList 
                firebase = {firebase}
                handleRoomClick={this.handleRoomClick.bind(this)}
                activeRoom = {this.state.activeRoom} />
            </aside>    

            <MessageList
                  firebase = {firebase}
                  activeRoom = {this.state.activeRoom}
                  user = {this.state.user} /> 
          </div>

        </div>
      );
    }
  }

export default App;
