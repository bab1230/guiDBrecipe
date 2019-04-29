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
	verifyUser = async (e) => {
		e.preventDefault();
		let URL = 'http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/users/login';
		const user = {
			username: this.state.username,
			password: this.state.password
		}
		axios.post(URL, {
			user_name: user.username,
			user_password: user.password
		}).then(res => {
			if (res){
				this.props.history.push('/home')
				this.props.update(true);
			}
			localStorage.setItem('token', res.data)
			console.log(res);
			return res.data
		}).catch(err => {
			alert(err);
		})
	};
	render() {
		return (
			<div>
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
					<SignUp history={this.history} className="center-sign" />
				</div>
			</div>
		);
	}
}
export default Login;
//export default withRouter(Login);