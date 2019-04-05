import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal' 
import './SignUp.css';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: null,
			username: null,
            password: null,
            confirmPassword: null
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow() {
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return(
            <>
        <Button variant="link" onClick={this.handleShow}>
            Sign Up
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Join us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input id="email" className="form-control" type="text" onChange={(event) =>
							this.setState({ email: event.target.value })}>
						</input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Username: </label>
                        <input id="username" className="form-control" type="text" onChange={(event) =>
							this.setState({ username: event.target.value })}>
						</input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input id="password" className="form-control" type="password" onChange={(event) =>
                            this.setState({ password: event.target.value })}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input id="confirmPassword" className="form-control" type="password" onChange={(event) =>
                            this.setState({ confirmPassword: event.target.value })}>
                        </input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
            </>
        );
    }
}

export default SignUp;