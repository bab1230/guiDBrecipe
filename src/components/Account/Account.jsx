import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import './Account.css';

class Account extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			username: ''
		}
		this.handleClose = this.handleClose.bind(this);
	}
    handleClose() {
		this.props.close();
        this.setState({
            email: '',
            username: ''
        });
	}
	componentDidMount() {
		/*let URL = 'http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/users/info'
		axios.get(URL).then(res =>{
			console.log(res)
		})*/
	}

	render() {
		return (
			<>
				<Modal size="sm" show={this.props.show} onHide={this.handleClose}>
					<Modal.Header closeButton>Account:</Modal.Header>
					<Modal.Body>
						Username: bawallace<br/>
						First Name: Braden<br/>
						Last Name: Wallace<br/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default Account;