import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {

    state = {
        redirectTo: null,
        active: null
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        if (this.state.redirectTo) {
            this.setState({
                redirectTo: null
            })
        }
    }



    logout = (event) => {
        event.preventDefault();
        console.log('logging out')
        axios.post('/api/logout').then(response => {
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

    handleClick = (id, e) => {
        console.log(this.props.location);
        this.setState({
            active: id
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        const active = this.state.active;
        console.log(this);
        if (this.state.redirectTo == '/') {
            return <Redirect to={{ pathname: '/' }} />;
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <a className="navbar-brand" href={loggedIn ? "/api/dashboard" : "/"}>Weightlifting Tracker</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01" >
                            {loggedIn ? (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/" onClick={this.logout}>Log Out<span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                            ) : (

                                    <ul className="navbar-nav mr-auto">
                                        <li className='nav-item'>
                                            <NavLink className="nav-link" to='/api/login'>Login </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink className="nav-link" to='/api/signup'>Register</NavLink>
                                        </li>
                                    </ul>
                                )}
                        </div>
                    </nav>
                </div>
            )
        }
    }
}


export default Navbar