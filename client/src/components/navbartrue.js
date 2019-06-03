import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class NavbarTrue extends Component {
    state ={
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

        if (loggedIn == false && this.state.redirectTo !== "") {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/api/dashboard">Personal Spotter</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/api/login" onClick={this.logout}>Log Out<span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
        }
    }
};

export default NavbarTrue;