import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user_actions';
import { Redirect } from 'react-router-dom';
/* Form components */
import { Container, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap';


class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        msg: this.props.msg,
        redirectTo: null,
        success: this.props.success,
        visible: false,
        loggedIn: this.props.loggedIn
    }

    onDismiss = () => {
        this.setState({
            visible: false
        });
    }

    updateMsg = (error) => {
        if (error) {
            return this.setState({
                msg: "Incorrect username or password. Please try again.",
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit this.props');
        const { dispatch } = this.props;

        const { username, password } = this.state;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }

    }

    render() {
        const { username, password } = this.state;
        if (this.state.loggedIn) {
            return <Redirect to={{ pathname: "/api/dashboard" }} />
        } else {
            return (
                <div className="loginDiv regLogin">
                    {this.state.msg && !this.state.success ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    {this.state.msg && this.state.success ? <Alert color="success">{this.state.msg}</Alert> : null}
                    <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Incorrect name or password. Please try again.
                    </Alert>
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

function mapStateToProps(state) {
    console.log(state);
    const { loggedIn } = state.authenticate;
    return {
        loggedIn
    };
}

export default connect(mapStateToProps)(LoginForm);
