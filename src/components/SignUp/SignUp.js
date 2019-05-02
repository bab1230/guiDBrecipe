import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './SignUp.css';
import UserRepository from '../../api/userRepository';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    userRepository = new UserRepository();
    handleShow() {
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({
            show: false,
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
    }
    signUp(e) {
        if (this.state.password === this.state.confirmPassword && this.state.firstname && this.state.lastname && this.state.username && this.state.password) {
            e.preventDefault();
            const NEW_USER = {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                user_name: this.state.username,
                user_password: this.state.password
            }
            this.userRepository.signUp(NEW_USER).then(res => {
                
            }).catch(err => {
                alert(err);
            })
            this.handleClose();
        }
    }

    render() {
        return (
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
                            <div className="row">
                                <div className="form-group col-6">
                                    <label htmlFor="firstname">First Name: </label>
                                    <input id="firstname" className="form-control" type="text" onChange={(event) =>
                                        this.setState({ firstname: event.target.value })}>
                                    </input>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="lastname">Last Name: </label>
                                    <input id="lastname" className="form-control" type="text" onChange={(event) =>
                                        this.setState({ lastname: event.target.value })}>
                                    </input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username: </label>
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
                        <Button variant="primary" onClick={this.signUp}>
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default SignUp;