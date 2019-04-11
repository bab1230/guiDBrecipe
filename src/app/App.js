import React, { Component } from 'react';
import Login from "../components/Login/Login.js";
import './App.css';
import Home from '../components/HomePage/Home.jsx'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
			<Home/>
			//<Login />

			/*<ThemeProvider theme={theme}>
        <div>
          <Router>
          <Header />
            <Switch>
              <Route exact path="/" component={List} />
              <Route path="/currency/:id" component={Detail} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>*/
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
