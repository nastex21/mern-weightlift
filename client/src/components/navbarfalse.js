import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class NavbarFalse extends Component {


    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/" >Personal Spotter</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01" >
                        <ul className="navbar-nav mr-auto">
                            <li className='nav-item'>
                                <NavLink className="nav-link" to='/api/login'>Login </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className="nav-link" to='/api/signup'>Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
};

export default NavbarFalse;