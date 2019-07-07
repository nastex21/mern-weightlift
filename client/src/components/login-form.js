import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        msg: this.props.msg,
        redirectTo: null,
        success: this.props.success
    }

    updateMsg = () => {
        this.setState({
            msg: "Sucessfully registered, please log in.",
            success: true
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log('login response: ')
            if (response.status === 200) {

                // update App.js state
                this.props.updateUser({
                    id: response.data._id,
                    loggedIn: true,
                    username: response.data.username,
                    exerciseLogs: response.data.logs,
                    cardioLogs: response.data.cardiologs,
                    bwLogs: response.data.bwlogs,
                    vidsLogs: response.data.vidslogs
                })

                // update the state to redirect to home
                this.setState({
                    redirectTo: '/api/dashboard',
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
                <div className="loginDiv regLogin">
                    {this.state.msg && !this.state.success ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    {this.state.msg && this.state.success ? <Alert color="success">{this.state.msg}</Alert> : null}
                    <Container className="loginForm regLoginForm">
                        <Form className="form1 regLogForm" onSubmit={e => this.handleSubmit(e)}>
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
                            <Input type="submit" className="loginButton" color="dark">Login</Input>
                        </Form>
                    </Container>
                </div>
            )
        }
    }
}


export default LoginForm
