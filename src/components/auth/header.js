import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import { Link } from 'react-router-dom';
import './login-page.css';

export class HeaderBar extends React.Component {
	logOut() {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	render() {
		// Only render the log out button if we are logged in
		let logOutButton;
		if (this.props.loggedIn) {
			logOutButton = <button onClick={() => this.logOut()}>Log out</button>;
		}
		return (
			<div className="header-bar">
				<Link to="/">{logOutButton}</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
