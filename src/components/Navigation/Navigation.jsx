import React, { Component } from 'react';
import Account from '../Account/Account';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Row } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
class Navigation extends Component {
    state = {
        showAccount: false,
        logout: false
    }
    toggleAccount(){
        this.setState({showAccount: !this.state.showAccount});
    }
    render() {
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
                                <NavDropdown.Item onClick={() => {localStorage.removeItem('token'); this.props.logout()}}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/ingredient">Ingredients</Nav.Link>
                            <Nav.Link as={NavLink} to="/favorite">Favorites</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline >
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button className="float-right" variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <Account show={this.state.showAccount} close={() => this.toggleAccount()}/>
            </>
        );
    }
}

export default Navigation;