import React, { Component } from 'react';
import { Row, Button, Form, Modal, Col } from 'react-bootstrap'
import axios from 'axios'
import './Account.css';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			edit: true
		}
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose() {
		this.props.close();
		this.setState({
			edit: false
		});
	}
	componentDidMount() {
		let URL = 'http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/users/info'
		let id = localStorage.getItem('token');
		axios.get(URL, {
			params: {
				user_id: id
		  }
		}).then(res => {
			this.setState({firstname: res.data[0].first_name, lastname: res.data[0].last_name, username: res.data[0].user_name})
			console.log(res, id)
		}).catch(e => console.log(e))
	}
	updateInfo(){
		let id = localStorage.getItem('token');
		let URL = 'http://ec2-18-222-255-36.us-east-2.compute.amazonaws.com:4000/users/info/update'

		axios.post(URL, {
			first_name_update: this.state.firstname,
			last_name_update: this.state.lastname
		}, {params :{
			user_id: id
		}}).then(res => console.log(res)).catch(err => alert(err))
	}
	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	render() {

		const NoEdit = (props) => {
			return (
				<div className="text-center">
					Username: {this.state.username}<br /><br />
					First Name: {this.state.firstname}<br /><br />
					Last Name: {this.state.lastname}<br /><br />
				</div>
			);
		}
		const EditInfo = (props) => {
			return(
				<Form>
					<Form.Group as={Row}>
						<Form.Label column sm="3">Username:</Form.Label>
						<Col sm="9">
							<Form.Control name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this)}></Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label column sm="3">First Name:</Form.Label>
						<Col sm="9">
							<Form.Control name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange.bind(this)}></Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label name="lastname" column sm="3">Last Name:</Form.Label>
						<Col sm="9">
							<Form.Control type="text" value={this.state.lastname} onChange={this.handleChange.bind(this)}></Form.Control>
						</Col>
					</Form.Group>
				</Form>
			);
		}
		
		return ( 
			
			<>
				<Modal dialogClassName="modal-width-test" show={this.props.show} onHide={this.handleClose}>
					<Modal.Header closeButton>Account:</Modal.Header>
					<Modal.Body>
						{!this.state.edit && NoEdit()}
						{this.state.edit && EditInfo()}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="button" onClick={() => {
							if(this.state.edit) {
								this.updateInfo()
							}
							this.setState({edit: !this.state.edit})
							}}>{this.state.edit ? "Save" : "Edit"}</Button>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default Account;