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
        msg: this.props.dataModifier.msg,
        success: this.props.success,
        visible: false
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
        console.log(this.props.dataModifier.msg);
        if (this.props.dataModifier.loggedIn) {
            return <Redirect to={{ pathname: "/api/dashboard" }} />
        } else {
            return (
                <div className="loginDiv regLogin">
                    {this.props.dataModifier.msg ? <Alert color="danger">{this.props.dataModifier.msg}</Alert> : null}
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
    const { alert, dataModifier } = state;
    return {
        dataModifier
    }; 
}

export default connect(mapStateToProps)(LoginForm);
