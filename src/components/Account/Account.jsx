import React, { Component } from 'react';
import { Row, Button, Form, Modal, Col } from 'react-bootstrap'
import axios from 'axios'
import './Account.css';
import UserRepository from '../../api/userRepository';

class Account extends Component {
	userRepository = new UserRepository();
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			username: '',
			hasEmptyField: false,
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
		let id = localStorage.getItem('token');
		this.userRepository.getUser(id).then(res => {
			this.setState({firstname: res[0].first_name, lastname: res[0].last_name, username: res[0].user_name})
		}).catch(err => console.log(err))
	}
	updateInfo(){
		if(this.state.username && this.state.lastname && this.state.firstname) {
			let id = localStorage.getItem('token');
		const USER = {
			first_name_update: this.state.firstname,
			last_name_update: this.state.lastname,
			user_name_update: this.state.username
		}
		this.userRepository.updateUser(USER, +id)
			.then(res => {

			})
			.catch(err =>console.log(err))
		}
	}
	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	render() {

		const NoEdit = (props) => {
			return (
				<div>
					<div className="row">
						<span className="col-3">Username: </span><span className="col-9"><b>{this.state.username}</b></span>
					</div>
					<br />
					<div className="row">
						<span className="col-3">First Name: </span><span className="col-9"><b>{this.state.firstname}</b></span>
					</div>
					<br />
					<div className="row">
						<span className="col-3">Last Name: </span><span className="col-9"><b>{this.state.lastname}</b></span>
					</div>
				</div>
				
				/*<div className="text-center">
					Username: <b style={{fontSize: "2em"}}>{this.state.username}</b><br /><br />
					First Name: <b style={{fontSize: "2em"}}>{this.state.firstname}</b><br /><br />
					Last Name: <b style={{fontSize: "2em"}}>{this.state.lastname}</b><br /><br />
				</div>*/
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
							<Form.Control name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange.bind(this)}></Form.Control>
						</Col>
					</Form.Group>
					{(!this.state.username || !this.state.lastname || !this.state.firstname) &&<p style={{color: 'red', fontWeight: 'bold'}}>All fields must be filled</p>}
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