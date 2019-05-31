import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from "reactstrap";
import { Redirect } from "react-router-dom";

class Signup extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        redirectTo: null,
        validate: {
            nameState: "",
            passwordState: "",
            password2State: ""
        }
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
        const { validate } = this.state;
        if (e.target.value.length >= 6) {
            validate.passwordState = "has-success";
        } else {
            validate.passwordState = "has-danger";
        }
        this.setState({ validate });
    };

    comparePasswords = e => {
        const { validate } = this.state;

        if (e.target.value !== this.state.password) {
            validate.password2State = "has-danger";
        } else {
            validate.password2State = "has-success";
        }

        this.setState({ validate });
    };

    handleChange = async event => {
        const { target } = event;

        const value = target.type === "checkbox" ? target.checked : target.value;
        console.log(value);
        const { name } = target;
        await this.setState({ [name]: value });
    };
    handleSubmit = event => {
        console.log("sign-up handleSubmit, username: ");
        console.log(this.state.username);
        event.preventDefault();

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

        this.setState({ validate });

        if (
            this.state.validate.nameState !== "has-danger" ||
            this.state.validate.passwordState !== "has-danger" ||
            this.state.validate.password2State !== "has-danger"
        ) {
            axios.post("/api/user/", { username: this.state.username, password: this.state.password })
                .then(response => {
                    console.log(response);
                    if (!response.data.errmsg) {
                        console.log("successful signup");
                        this.setState({
                            //redirect to login page
                            redirectTo: "/api/dashboard"
                        });
                    } else {
                        console.log(response.data.errmsg);
                        console.log("username already taken");
                    }
                })
                .catch(error => {
                    console.log("signup error: ");
                    console.log(error);
                });
        }
    };

    render() {
        const { username, password, password2 } = this.state;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        } else {
            return (
                <div className="registerForm">
                    <Container className="RegisterBox">
                        <h2>Register</h2>
                        <Form className="form" onSubmit={e => this.handleSubmit(e)}>
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
                                    <FormFeedback>
                                        Please enter a password longer than six characters
                  </FormFeedback>
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
                                        invalid={
                                            this.state.validate.password2State === "has-danger"
                                        }
                                        onChange={e => {
                                            this.comparePasswords(e);
                                            this.handleChange(e);
                                        }}
                                    />
                                    <FormFeedback valid> Good! </FormFeedback>
                                    <FormFeedback>Password mismatch</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Button>Submit</Button>
                        </Form>
                    </Container>
                </div>
            );
        }
    }
}

export default Signup;
