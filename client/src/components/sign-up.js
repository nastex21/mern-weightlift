import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userActions } from '../actions/user_actions';
import { connect } from 'react-redux';
import { Container, Col, Form, FormGroup, Label, Input, FormFeedback, Alert } from "reactstrap";


class Signup extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        validate: {
            nameState: "",
            passwordState: "",
            password2State: ""
        },
        msg: this.props.register.error,
        nameErr: '',
        passErr: ''
    };

    validateName = e => {
        const { validate } = this.state;

        if (e.target.value === "") {
            validate.nameState = "has-danger";
        } else {
            validate.nameState = "has-success";
        }
        this.setState({ validate });
    };

    validatePassword = e => {
        console.log('validatePassword');
        const { validate } = this.state;
        if (e.target.value.length > 5) {
            validate.passwordState = "has-success";
        } else {
            validate.passwordState = "has-danger";
        }
        this.setState({ validate });
    };

    comparePasswords = e => {
        console.log('comparePassword');
        const { validate } = this.state;

        if (e.target.value !== this.state.password) {
            validate.password2State = "has-danger";
        } else {
            validate.password2State = "has-success";
        }

        this.setState({ validate });
    };

    handleChange = async event => {
        console.log("handlechange");
        const { target } = event;
        console.log(target);

        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;

        console.log(value);
        console.log(name);

        if (name == 'username') {
            console.log(value);
            var check = new RegExp("^[a-zA-Z0-9]*$");
            if (check.test(value)) {
                await this.setState({ [name]: value, nameErr: '' });
            } else {
                await this.setState({
                    nameErr: "Username error: Only letters and numbers please."
                })
            }
        } else {
            console.log("else")
            await this.setState({ [name]: value });
        }

    };

    handleSubmit = event => {
        console.log("sign-up handleSubmit, username: ");
        event.preventDefault();

        const { dispatch } = this.props;

        const { validate } = this.state;

        if (this.state.username === "") {
            validate.nameState = "has-danger";
        }

        if (this.state.password === "") {
            validate.passwordState = "has-danger";
        }

        if (this.state.password2 === "") {
            validate.password2State = "has-danger";
        }

        if (this.state.password !== this.state.password2) {
            validate.passwordState = '';
            validate.password2State = "has-danger";
        }

        if (this.state.password === this.state.password2) {
            validate.passwordState = '';
            validate.password2State = '';
        }

        if (this.state.password.length < 6 || this.state.password2.length < 6) {
            this.setState({
                passErr: "Password is too short."
            })
        }

        console.log(this.state.password == this.state.password2)

        this.setState({
            validate
        }, function () {

            if (this.state.validate.nameState !== "has-danger" && this.state.validate.passwordState !== "has-danger" && this.state.validate.password2State !== "has-danger" && this.state.password == this.state.password2 && this.state.passErr && this.state.password.length >= 6 && this.state.password2.length >= 6) {
                var user = {
                    username: this.state.username,
                    password: this.state.password
                }

                console.log("went through");
                console.log(this.state);
                dispatch(userActions.register(user));
            }
        });
    }

    render() {
        const { username, password, password2 } = this.state;
        if (this.props.dataModifier.loggedIn) {
            return <Redirect to={{ pathname: "/api/dashboard" }} />
        } else {
            return (
                <div className="registerForm regLogin">
                    <Container className="RegisterBox regLoginForm">
                        {this.props.register.error ? <Alert color="danger">{this.props.register.error}</Alert> : null}
                        {this.state.nameErr ? <Alert color="danger">{this.state.nameErr}</Alert> : null}
                        {this.state.passErr ? <Alert color="danger">{this.state.passErr}</Alert> : null}
                        <Form className="form2 regLogForm" onSubmit={e => this.handleSubmit(e)}>
                            <Col>
                                <FormGroup>
                                    <Label for="formName"> Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Your name"
                                        value={username}
                                        valid={this.state.validate.nameState === "has-success"}
                                        invalid={this.state.validate.nameState === "has-danger"}
                                        onChange={e => {
                                            this.validateName(e);
                                            this.handleChange(e);
                                        }}
                                    />
                                    <FormFeedback valid> </FormFeedback>
                                    <FormFeedback> Please enter your name.</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="formPassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="formPassword"
                                        placeholder="******"
                                        value={password}
                                        valid={this.state.validate.passwordState === "has-success"}
                                        invalid={this.state.validate.passwordState === "has-danger"}
                                        onChange={e => {
                                            this.validatePassword(e);
                                            this.handleChange(e);
                                        }}
                                    />
                                    <FormFeedback valid>Valid password</FormFeedback>
                                    <FormFeedback> Please enter a password longer than six characters </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="formPassword2">Re-enter Password</Label>
                                    <Input
                                        type="password"
                                        name="password2"
                                        id="formPassword2"
                                        placeholder="******"
                                        value={password2}
                                        valid={this.state.validate.password2State === "has-success"}
                                        invalid={this.state.validate.password2State === "has-danger"}
                                        onChange={e => {
                                            this.comparePasswords(e);
                                            this.handleChange(e);
                                        }}
                                    />
                                    <FormFeedback valid> Good! </FormFeedback>
                                    <FormFeedback>Password mismatch</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Input type="submit" className="loginButton" color="dark">Login</Input>
                        </Form>
                    </Container>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { registering } = state.register;
    const { dataModifier, register } = state;
    return {
        dataModifier,
        registering,
        register
    };
}

export default connect(mapStateToProps)(Signup);