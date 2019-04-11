import React, { Component } from 'react';
import './Login.css';
import SignUp from '../SignUp/SignUp.js';
import axios from 'axios'

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		};
		this.verifyUser = this.verifyUser.bind(this);
	}
	verifyUser = async () => {
		console.log("hi")

		/*var session_url = 'https://b9bcbed5-1ca5-49fd-92f4-808293a187f0.mock.pstmn.io/api/login';
		var credentials = btoa(this.props.username + ':' + this.props.password);
		var basicAuth = 'Basic ' + credentials;
		axios.post(session_url, {}, {
			headers: { 'Authorization': + basicAuth }
		}).then(function (response) {
			console.log('Authenticated');
		}).catch(function (error) {
			console.log('Error on Authentication');
		});*/

		if (this.state.username === "test" && this.state.password === "1234")
			this.props.history.push("/home");
		/*const url = `api/users/verify?Username=${this.state.username}&Password=${this.state.password}`;
		try {
			const response = await fetch(url);
			const body = await response.json();

			if (response.status !== 200) throw Error(body.message);
			if (body.resp.resp.auth === true) this.props.updateLoginState(true);
			//let path = `../HomePage/Home`;
    		//this.props.history.push(path);
		}
		catch (e) {
			return e;
		}*/
	};
	render() {
		return (
			<>
				<div className="form-horizontal login-form col-md-3 center-login shadow-lg">
					<h1 className="nobold">Login:</h1>
					<hr />
					<form>
						<div className="form-group">
							<label htmlFor="username">Username:</label>
							<input id="username" className="form-control" type="text" onChange={(event) =>
								this.setState({ username: event.target.value })}>
							</input>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input id="password" className="form-control" type="password" onChange={(event) =>
								this.setState({ password: event.target.value })}>
								{console.log(this.state.username, this.state.password)}
							</input>
						</div>
						<button type="button" className="btn btn-primary w-100 mb-2" onClick={this.verifyUser}>Log In</button>
					</form>
					<SignUp className="center-sign" />
				</div>
			</>
		);
	}
}
export default Login;
//export default withRouter(Login);