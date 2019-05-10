import React, { Component } from 'react';
import { Button, Container, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        msg: null,
        redirectTo: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
                }).then(response => {
            console.log('login response: ')
            console.log(response)
            if (response.status === 200) {

                // update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username,
                    exerciseLogs: response.data.logs
                                })

                // update the state to redirect to home
                this.setState({
                     redirectTo: '/dashboard',
                    })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);

        })
    }

    render() {
        const { username, password } = this.state;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Container className="loginForm">
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Col>
                                <FormGroup>
                                    <Label for="username"> Username </Label>
                                    <Input type="text" name="username" id="username" placeholder="Username" className="mb-3" value={username} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="password"> Password </Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" value={password} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Button color="dark">Login</Button>
                        </Form>
                    </Container>
                </div>
            )
        }
    }
}


export default LoginForm
