import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props){
		super(props);

		this.state = {
			rooms: [],
			newRoomName: ""
		};
  		this.roomsRef = this.props.firebase.database().ref('rooms');
  	}

  	handleChange(event) {
  		this.setState({newRoomName: event.target.value});
  	}
  	
	handleCreateRoom(newRoomName,e) {
		e.preventDefault(); 
		this.roomsRef.push({
			name: newRoomName

		});
	}
  	
	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat(room) })
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={ (e)=>{ this.handleCreateRoom(this.state.newRoomName,e) } }> 
					<h3>Create new room</h3>
					<label>
					Enter a room name:
					<input type="text" value={ this.state.newRoomName } onChange={ e=>this.handleChange(e) } name="newRoomName" />
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