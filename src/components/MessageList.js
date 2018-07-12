import React, { Component } from 'react';

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
		console.log("From MessageList.js - activeRoomKey = " + this.props.activeRoom.key);
			this.messagesRef.on('child_added', snapshot => {
			let message = Object.assign(snapshot.val(), {key: snapshot.key})
			this.setState({ allMessages: this.state.allMessages.concat(message)});
			this.setState({ messagesPerRoom: this.state.allMessages.filter ( message => message.roomId === this.props.activeRoomkey ) })
			 console.log("activeRoomkey = " + this.props.activeRoomKey);

			 console.log("messagePerRoom = " + this.state.messagesPerRoom);

		});

		}
	

	render() {
		return(
			<div>
				{ this.state.messagesPerRoom.map ( message => 

					<ul id="message-list">
						<li key={message.key}>
								<p>{ message.username }</p>
								<p>{ message.content }</p>
								<p>{ message.sentAt }</p>
								<p>{ message.roomId }</p>
							
						</li>
					</ul>
					)
				}
			</div>
		);
	}
}

export default MessageList;

