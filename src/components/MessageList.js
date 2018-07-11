import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages : []
		};
		this.messagesRef = this.props.firebase.database().ref('Messages');
	}

	componentDidMount() {
			this.setState({messages: "This is the messages from room1, which is the activeRoom on componen mount"});
		}
	



	render() {
		return(
			<div>
				<p>{this.state.messages}</p>
			</div>
		);
	}
}

export default MessageList;

