import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allMessages : [],
			messagesPerRoom : [],
			newMessage: ""
		};
		
		this.messagesRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount(){
		this.messagesRef.on('child_added', snapshot => {
			let message = Object.assign(snapshot.val(), {key: snapshot.key})
			this.setState({ allMessages: this.state.allMessages.concat(message)});
		});
	}

	componentWillReceiveProps(nextProps) {
			if(nextProps.activeRoom.key !== this.props.activeRoom.key) {
			this.setState({ messagesPerRoom: this.state.allMessages.filter ( message => message.roomId === nextProps.activeRoom.key ) })
		}
	}

	handleNewMessage(e) {
		this.setState({ newMessage : e.target.value });
		console.log(this.state.newMessage);
		var message = {
			username: this.props.user.displayName,
			content: this.state.newMessage,
			sentAt: 23,
			roomId: this.props.activeRoom.key
		};

		//Write new message to firebase database at node 'messages'
		this.messagesRef.push(message);

	}

	handleSendNewMessage(e) {
		e.preventDefault(); 

		

		this.setState({ messagesPerRoom : this.state.messagesPerRoom.concat(this.state.newMessage)});
	}
	
	render() {
		return(
			<div>

				<ul id="message-list">

					{ this.state.messagesPerRoom.map ( message => 
						<li key={message.key}>
							<p className="username">{ message.username } @ <span className="time-sent">{ message.sentAt }</span></p>
							<p>{ message.content }</p>
						</li>
					)}
				</ul>
				<form className="new-message-form">
					<label>
						Enter a message:
						<input type="text" value={this.state.newMessage} onChange={(e) => this.handleNewMessage(e)} name="newMessage" />
					</label>
					<button type="submit" className="btn-submit" id="btn-send" onClick={ (e) => this.handleSendNewMessage(e) }>Send</button>
				</form>
			</div>
		);
	}
}

export default MessageList;

