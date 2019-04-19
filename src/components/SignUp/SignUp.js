import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import './SignUp.css';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    handleShow() {
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({
            show: false,
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
    }
    signUp(e) {
        if (this.state.password === this.state.confirmPassword && this.state.email && this.state.username && this.state.password) {
            e.preventDefault();
            let URL = 'http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/users/register';
            axios.post(URL, {
                first_name: 'jonh',
                last_name: 'smit',
                user_name: this.state.username,
                user_password: this.state.password
            }).then(res => {
                console.log(res);
            }).catch(err => {
                alert(URL);
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