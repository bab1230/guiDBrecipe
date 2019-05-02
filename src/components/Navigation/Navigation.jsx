import React, { Component } from 'react';
import Account from '../Account/Account';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
class Navigation extends Component {
    state = {
        showAccount: false,
        logout: false,
        search: false,
        searchValue: ''
    }
    toggleAccount(){
        this.setState({showAccount: !this.state.showAccount});
    }
    search() {
        this.setState({search: true});
    }
    componentDidUpdate() {
        if(this.state.search)
            this.setState({search: false})
    }
    render() {
        if(this.state.search) {
            return <Redirect to={`/search/${this.state.searchValue}`}/>
        }
        return (
            <>
                <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Nav.Link as={NavLink} to="/home" style={{color: 'white', textDecoration: 'none'}}><h3>Recipeazy</h3></Nav.Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown className="flow-right" id="dropdown-menu-align-right" title="Account">
                                <NavDropdown.Item onClick={() => this.toggleAccount()}>Account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item style={{backgroundColor: 'white', color: 'black'}}as={NavLink} to="/"onClick={() => {localStorage.removeItem('token'); this.props.logout()}}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/ingredient">Ingredients</Nav.Link>
                            {/* <Nav.Link as={NavLink} to="/favorite">Favorites</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline onSubmit={() => this.search()}>
                        <FormControl 
                            type="text" 
                            placeholder="Search" 
                            className="mr-sm-2" 
                            onChange={(event) =>
								this.setState({ searchValue: event.target.value })}
                            />
                        <Button className="float-right" variant="outline-info" onClick={() => {this.search()}}>Search</Button>
                    </Form>
                </Navbar>
                <Account show={this.state.showAccount} close={() => this.toggleAccount()}/>
            </>
        );
    }
}

export default Navigation;