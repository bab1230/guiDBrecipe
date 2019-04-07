import React, { Component } from 'react';
import logo from './logo.svg';
import Login from "./components/Login/Login.js";
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Sidebar from './components/Sidebar/Sidebar';
import Backdrop from './components/Backdrop/Backdrop';
import { AccountTableItem } from './components/AccountTable/accountTableItem';
import { AccountTable } from './components/AccountTable/accountTable';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginState: false,
            sidebarOpen: false,
            favorites: [
                new AccountTableItem("Ragu", 1),
                new AccountTableItem("Pasta", 1),
                new AccountTableItem("Chimichunga", 1)

            ],

            pantry: [
                new AccountTableItem("Salt", 1),
                new AccountTableItem("Starinese", 4),
                new AccountTableItem("Pepper", 1)
            ],

            fridge: [
                new AccountTableItem("Chicken Breasts", 3),
                new AccountTableItem("ragu", 1),
                new AccountTableItem("ragu", 1)
            ],

            appliances: [
                new AccountTableItem("Pan", 2),
                new AccountTableItem("Pot", 4),
                new AccountTableItem("Lid", 1),
            ],

            tabledata: [
                new AccountTableItem("Salt", 1),
                new AccountTableItem("Starinese", 4),
                new AccountTableItem("Pepper", 1)
            ]
		}
		this.updateLoginState = this.updateLoginState.bind(this);
	}

	updateLoginState = (bool) => {
		this.setState({
			loginState: bool
		});
	};

    setTableDataFavorites = () => {
    this.setState({tabledata: this.favorites})
  }

  setTableDataPantry = () => {
    this.setState({tabledata: this.pantry})
  }

  setTableDataFridge = () => {
    this.setState({tabledata: this.fridge})
  }

  setTableDataAppliances = () => {
    this.setState({tabledata: this.appliances})
  }

  sidebarToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sidebarOpen: !prevState.sidebarOpen};
    });
  };

      backdropClickHandler = () => {
    this.setState({sidebarOpen: false});
  };

	render() {
        let sidebar;
    let backdrop;

    if(this.state.sidebarOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

		return(
            <Login />
            <div style={{height: '100%'}}>
        <Toolbar sidebarClickHandler={this.sidebarToggleClickHandler} />
        <Sidebar show={this.state.sidebarOpen}
            setTableDataFavorites={this.setTableDataFavorites}
            setTableDataPantry={this.setTableDataPantry}
            setTableDataFridge={this.setTableDataFridge}
            setTableDataAppliances={this.setTableDataAppliances}
            favorites={this.favorites}
            pantry={this.pantry}
            fridge={this.fridge}
            appliances={this.appliances}
        />

        {backdrop}
        <main>
          <AccountTable
            tabledata={this.state.tabledata}
            style={this.state.sidebarOpen ? {width: "85%"} : {width: "100%"}} />
        </main>

      </div>
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
