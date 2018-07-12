import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allMessages : [],
			messagesPerRoom : []
		};
		this.messagesRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount(){
		this.messagesRef.on('child_added', snapshot => {
			let message = Object.assign(snapshot.val(), {key: snapshot.key})
			this.setState({ allMessages: this.state.allMessages.concat(message)});
			this.setState({ messagesPerRoom: this.state.allMessages.filter ( message => message.roomId === this.props.activeRoomkey ) })
		});

	}
	

	render() {
		return(
			<div>
				<ul id="message-list">
					{ this.state.allMessages.map ( message => 
						<li key={message.key}>
							<p className="username">{ message.username } @ <span className="time-sent">{ message.sentAt }</span></p>
							<p>{ message.content }</p>
						</li>
						)}
				</ul>
			</div>
		);
	}
}

export default MessageList;

