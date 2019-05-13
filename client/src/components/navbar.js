import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {

    state = {
        redirectTo: null
    }

    componentDidUpdate() {
        if (this.state.redirectTo) {
            this.setState({
                redirectTo: null
            })
        }
    }

    logout = (event) => {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.setState({
                    redirectTo: '/'
                })

                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }

        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;

        if (this.state.redirectTo == '/') {
            return <Redirect to={{ pathname: '/' }} />;
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="collapse navbar-collapse" id="navbarColor01" >
                            {loggedIn ? (
                                <div className="collapse navbar-collapse" id="navbarColor01">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/">Weight Lifting Tracker<span className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/" onClick={this.logout}>Log Out<span className="sr-only">(current)</span></a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (

                                    <div className="collapse navbar-collapse" id="navbarColor01">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <a className="nav-link" href="/">Weight Lifting Tracker<span className="sr-only">(current)</span></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/login">Login</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/signup">Register</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                        </div>
                    </nav>
                </div>
            )
        }
    }
}


export default Navbar