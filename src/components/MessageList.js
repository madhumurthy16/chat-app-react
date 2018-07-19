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
		
	}

	handleSendNewMessage(e) {
		e.preventDefault(); 
		var message = {
			username: this.props.user.displayName,
			content: this.state.newMessage,
			sentAt: 12,
			roomId: this.props.activeRoom.key
		};

		//Write new message to firebase database at node 'messages'
		this.messagesRef.push(message);
		this.setState({ messagesPerRoom : this.state.messagesPerRoom.concat(message), newMessage : ""});

	}
	
	render() {
		return(
			<main id="messages-component">

				<p id="active-room-name">{ this.props.activeRoom? this.props.activeRoom.name : 'Select a chat room to view or send messages'}</p>
				<ul id="message-list">

					{ 
						this.state.messagesPerRoom.map ( message => 
							<li key={message.key}>
								<p className="message-content">{ message.content }</p>
								<p className="username">{ message.username } @ <span className="time-sent">{ message.sentAt }</span></p>
							</li>
						)
					}
				</ul>
				<section id="send-message">
					<form id="form-create-message">
						<label>
							<input type="text" value={this.state.newMessage} onChange={(e) => this.handleNewMessage(e)} name="newMessage" placeholder="Start chatting!"/>
						</label>
						<button type="submit" className="btn-submit" id="btn-send" onClick={ (e) => this.handleSendNewMessage(e) }>Send</button>
					</form>
				</section>

			</main>
		);
	}
}

export default MessageList;

