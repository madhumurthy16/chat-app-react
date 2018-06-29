import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props){
		super(props);

		this.state = {
			rooms: []
		};

  		this.roomsRef = this.props.firebase.database().ref('rooms');		
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat(room) })
		});
	}

	handleCreateRoom(event) {
		this.roomsRef.push({
			name: event.target.value
		});
	}

	render() {
		return (
			<div>

					<form onSubmit={this.handleCreateRoom}> 
						<h3>Create new room</h3>
						<label>
						Enter a room name:
						<input type="text" />
						</label>
						<input type="submit" value="Submit" />
					</form>
				{
					this.state.rooms.map(room => 
						<p key={room.key}>{room.name}</p>	
					)
				}

			</div>
		);
	}
}

export default RoomList;