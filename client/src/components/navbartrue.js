import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
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
                <nav className="navbar navbar-expand-sm bg-primary text-white">
                        <div className="linkDiv">
                            <a className="navbar-brand mb-0 h1 text-light" href="/api/dashboard/">Personal Trainer</a>
                        </div>
                        {/* <a className="nav-link" href="#">Active</a> */}
                        <div className="rowLegend collapse navbar-collapse">
                            <div className='boxIcon red navbar-nav"'>
                                <span className="nav-item">Weightlifting</span>
                            </div>

                            <div className='boxIcon blue'>
                                <span className="nav-item">Cardio</span>
                            </div>

                            <div className='boxIcon green'>
                                <span className="nav-item">Bodyweight</span>
                            </div>

                            <div className='boxIcon orange'>
                                <span className="nav-item">Classes and Videos</span>
                            </div>
                        </div>
                        <div className="logoutDiv">
                        <a className="nav-link active" href="/api/login" onClick={this.logout}>Log Out<span className="sr-only">(current)</span></a>                        </div>
                </nav>
            )
        }
    }
};

export default NavbarTrue;