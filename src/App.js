import React, { Component } from 'react';
import logo from './logo.svg';
import Login from "./components/Login/Login.js";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginState: false
		}
		this.updateLoginState = this.updateLoginState.bind(this);
	}

	updateLoginState = (bool) => {
		this.setState({
			loginState: bool
		});
	};

	render() {
		return(
			<Login />
		);
		/*let login = <Login updateLoginState={this.loginState} />
		return (
			<div className="App">
			  <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				  Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
				  className="App-link"
				  href="https://reactjs.org"
				  target="_blank"
				  rel="noopener noreferrer"
				>
				  Learn React
				</a>
			  </header>
			</div>
		);*/
	}
}

export default App;
