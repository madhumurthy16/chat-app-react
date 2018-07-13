import React, { Component } from 'react';
import './User.css';

class User extends Component {

	handleSignIn(e) {
		// Create an instance of the Google provider object
		const provider = new this.props.firebase.auth.GoogleAuthProvider(); 
		
		//Autheniticate with firebase using the Google provider object
		this.props.firebase.auth().signInWithPopup(provider).then(function(result) {

				// The signed-in user info
				var user = result.user;
				this.setState({ user: user });

			}).catch(function(error) {
				//Handle errors
				var errorCode = error.code;
				console.log(errorCode);
				var errorMessage = error.message;
				console.log(errorMessage);
				// The email of the user's account used
				var email = error.email;
				console.log(email);
			});
	} 


	handleSignOut(e) {
		console.log("From inside handleSignOut");
		this.props.firebase.auth().signOut();
	}


	componentDidMount() {
		//Add a real time listener 
		this.props.firebase.auth().onAuthStateChanged( user => {
				this.props.setUser(user);
		})
	}

	render() {
		return (
			<div id="user-auth">
				{ 
					
						<p>Hello, { this.props.user }</p>
					
				}
				<form>
					<button className="btn-submit" id="btn-signin" type="submit" onClick={ e => this.handleSignIn(e) }>Sign In</button>
					<button className="btn-submit" id="btn-signout" type="submit" onClick={ e => this.handleSignOut(e) }>Sign Out</button>
				</form>
			</div>
		);
	}
}

export default User;