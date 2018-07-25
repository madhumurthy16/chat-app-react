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
			<section id="room-component">
				
				<h3>Chat rooms</h3> 
				<ul id="room-list">
					{
						this.state.rooms.map(room => 
							<li onClick={() => this.props.handleRoomClick(room)} key={room.key}>{room.name}</li>	
						)
					}
				</ul>

				<form id="form-create-room" onSubmit={ (e)=>{ this.handleCreateRoom(this.state.newRoomName,e) } }> 
					<h3 id="new-room">Create new room</h3>
					<label>
					<input type="text" value={ this.state.newRoomName } onChange={ e=>this.handleChange(e) } name="newRoomName" placeholder="Enter room name" />
					</label>
					<button className="btn-submit" id="btn-newroom" type="submit" value="Submit">Go</button>
				</form>

			</section>
		);
	}
}

export default RoomList;