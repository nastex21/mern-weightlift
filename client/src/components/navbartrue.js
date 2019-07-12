import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar,  NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';

class NavbarTrue extends Component {
    state = {
        loggedIn: '',
        redirectTo: ''
    }


    logout = (event) => {
        console.log('logging out')
        axios.post('/api/logout').then(response => {
            if (response.status === 200) {

                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })

                this.setState({
                    loggedIn: false,
                    redirectTo: '/api/login',
                })


            }
        }).catch(error => {
            console.log('Logout error')
        })

    }

    render() {
        const loggedIn = this.state.loggedIn;

        console.log("logged in true");

        if (loggedIn == false && this.state.redirectTo !== "") {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Navbar color="secondary" dark expand="md">
                    <NavbarBrand href="/api/dashboard/">Personal Trainer</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/api/login" onClick={this.logout}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            )
        }
    }
};

export default NavbarTrue;