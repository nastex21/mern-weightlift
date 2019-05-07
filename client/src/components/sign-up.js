import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			password2: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	const { username, password, password2 } = this.state;
    return (
      <div className="registerForm">
        <Container className="RegisterBox">
          <h2>Register</h2>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label for="formName">Username</Label>
                <Input type="text" name="name" id="userName" placeholder="Your name" value={username} valid={this.state.validate.nameState === 'has-success'} invalid={this.state.validate.nameState === 'has-danger'} onChange={(e) => {
                  this.validateName(e)
                  this.handleChange(e)
                }} />
                <FormFeedback valid></FormFeedback>
                <FormFeedback>Please enter your name.</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="formPassword">Password</Label>
                <Input type="password" name="password" id="formPassword" placeholder="******" value={password} valid={this.state.validate.passwordState === 'has-success'} invalid={this.state.validate.passwordState === 'has-danger'} onChange={(e) => {
                  this.validatePassword(e)
                  this.handleChange(e)
                }}
                />
                <FormFeedback valid>Valid password</FormFeedback>
                <FormFeedback>Please enter a password longer than six characters</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="formPassword2">Re-Enter Password</Label>
                <Input type="password" name="password2" id="formPassword2" placeholder="******" value={password2} valid={this.state.validate.password2State === 'has-success'} invalid={this.state.validate.password2State === 'has-danger'} onChange={(e) => {
                  this.comparePasswords(e)
                  this.handleChange(e)
                }}
                />
                <FormFeedback valid>Good!</FormFeedback>
                <FormFeedback>Password mismatch</FormFeedback>
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }	

}

export default Signup
