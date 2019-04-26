import React, { Component } from 'react';
import Account from '../Account/Account';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class Navigation extends Component {
    state = {
        showAccount: false
    }
    toggleAccount(){
        this.setState({showAccount: !this.state.showAccount});
    }
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" style={{ margin: 20 }}>
                    <Navbar.Brand><h3>Recipeazy</h3></Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavDropdown className="flow-right" id="dropdown-menu-align-right" title="Account">
                            <NavDropdown.Item onClick={() => this.toggleAccount()}>Account</NavDropdown.Item>
                            <NavDropdown.Item>My Ingredients</NavDropdown.Item>
                            <NavDropdown.Item>My Favorites</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Ingredients</Nav.Link>
                        <Nav.Link as={NavLink} to="/favorite">Favorites</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <Account show={this.state.showAccount} close={() => this.toggleAccount()}/>
            </>
        );
    }
}

export default Navigation;