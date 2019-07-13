import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user_actions';
/* Components */
import { Navbar,  NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavbarTrue extends Component {
    state = {
        loggedIn: this.props.loggedIn,
        redirectTo: ''
    }


    logout = () => {
        /* console.log('logging out')
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
        }) */
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
                            <NavLink href="/api/login" onClick={this.props.dispatch(userActions.logout)}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            )
        }
    }
};

function mapStateToProps(state) {
    console.log(state);
    const { loggedIn } = state.authenticate;
    return {
        loggedIn
    };
}

export default connect(mapStateToProps)(NavbarTrue);