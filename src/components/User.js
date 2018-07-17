import React, { Component } from 'react';
import './User.css';

class User extends Component {

	componentDidMount() {
		//Add a real time listener 
		this.props.firebase.auth().onAuthStateChanged( user => {
				this.props.setUser(user);
		})
	}

	handleSignIn(e) {
		// Create an instance of the Google provider object
		const provider = new this.props.firebase.auth.GoogleAuthProvider(); 
		
		//Autheniticate with firebase using the Google provider object
		this.props.firebase.auth().signInWithPopup(provider);
	} 

	handleSignOut(e) {
		this.props.firebase.auth().signOut();
	}

	render() {
		return (
			<section id="user-auth">
				{
					<p>Hello, { this.props.user ? this.props.user.displayName : "Guest" }</p>
					 
				}
				<button className="btn-submit" id="btn-signin" type="submit" onClick={ e => this.handleSignIn(e) }>Sign In</button>
				<button className="btn-submit" id="btn-signout" type="submit" onClick={ e => this.handleSignOut(e) }>Sign Out</button>
			</section>
		);
	}
}

export default User;