import React, { Component } from 'react';
import './RoomList.css';

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
			this.setState({ rooms: this.state.rooms.concat(room), newRoomName: "" });
		});
	}

	render() {
		return (
			<div className="left-sidebar">
				<form onSubmit={ (e)=>{ this.handleCreateRoom(this.state.newRoomName,e) } }> 
					<h3>Create new room</h3>
					<label>
					<input type="text" value={ this.state.newRoomName } onChange={ e=>this.handleChange(e) } name="newRoomName" />
					</label>
					<button type="submit" value="Submit">Submit</button>
				</form>
				
				<p>Select a chat room to view or send messages</p> 

				{
					this.state.rooms.map(room => 
						<p className="room-list" onClick={() => this.props.handleRoomClick(room)} key={room.key}>{room.name}</p>	
					)
				}

			</div>
		);
	}
}

export default RoomList;