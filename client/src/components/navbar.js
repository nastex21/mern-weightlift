import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {

    state = {
        redirectTo: null
        }

    componentDidUpdate(){
        if(this.state.redirectTo){
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
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="col-4" >
                            {loggedIn ? (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                                        <span className="text-secondary">logout</span>
                                    </Link>
                                </section>
                            ) : (
                                    <section className="navbar-section">
                                        <Link to="/" className="btn btn-link text-secondary">
                                            <span className="text-secondary">home</span>
                                        </Link>
                                        <Link to="/login" className="btn btn-link text-secondary">
                                            <span className="text-secondary">login</span>
                                        </Link>
                                        <Link to="/signup" className="btn btn-link">
                                            <span className="text-secondary">sign up</span>
                                        </Link>
                                    </section>
                                )}
                        </div>
                        <div className="col-4 col-mr-auto">
                            <div id="top-filler"></div>
                            <h1 className="App-title">Weightlifting Tracker</h1>
                        </div>
                    </nav>
                </div>
            )}
    }
}


export default Navbar