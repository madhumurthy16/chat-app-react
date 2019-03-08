import React, { Component } from 'react';
import './MessageList.css';
import moment from 'moment';

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

		let message = {
			username: this.props.user.displayName,
			content: this.state.newMessage,
			sentAt: moment().format('MMMM Do, h:mm a'),
			roomId: this.props.activeRoom.key
		};

		//Write new message to firebase database at node 'messages'
		this.messagesRef.push(message);
		this.setState({ messagesPerRoom : this.state.messagesPerRoom.concat(message), newMessage : ""});

	}
	
	render() {
		return(
			<main id="messages-component">

				<h2 id="active-room-name">{ this.props.activeRoom? this.props.activeRoom.name : 'Select a chat room to view or send messages'}</h2>
				<ul id="message-list">

					{ 
						this.state.messagesPerRoom.map ( message => 
							<li key={message.key}>
								<p className="username"><i className="icon ion-md-contact"></i>{ message.username }</p>
								<p className="message-content">{ message.content }</p>
								<p className="time-sent">{ message.sentAt }</p>
							</li>
						)
					}
				</ul>
				<section id="send-message">
					<form id="form-create-message">
						<label>
							<input type="text" value={this.state.newMessage} onChange={(e) => this.handleNewMessage(e)} name="newMessage" placeholder="Start chatting!"/>
						</label>
						<button type="submit" className="btn-submit" id="btn-send" onClick={ (e) => this.handleSendNewMessage(e) }><i className="icon ion-md-paper-plane"></i></button>
					</form>
				</section>

			</main>
		);
	}
}

export default MessageList;

