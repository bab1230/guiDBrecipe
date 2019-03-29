import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal' 
import './SignUp.css';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: null,
			username: null,
			password: null
		};
    }

    render() {
        return(
            <>
                <Button/>
            </>
        );
    }
}

export default SignUp;