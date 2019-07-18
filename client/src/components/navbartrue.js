import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user_actions';
/* Components */
import { Navbar,  NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavbarTrue extends Component {

    logOut = () => {
        this.props.dispatch(userActions.logout)
    }

    render() {
        return(
                <Navbar color="secondary" dark expand="md">
                    <NavbarBrand href="/api/dashboard/">Personal Trainer</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/api/login" onClick={this.logOut}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
        )
    }
};

export default connect(null)(NavbarTrue);