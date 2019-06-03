import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import NavbarTrue from './components/navbartrue';
import NavbarFalse from './components/navbarfalse';
import Home from './components/home';
import Dashboard from './components/dashboard';

class App extends Component {
    state = {
      id: null,
      loggedIn: null,
      username: null,
      exerciseLogs: []
    }

 componentDidMount() {
   console.log("get user!!!!!!!!!!!!!!!!!!!!!1 RUUUUNS")
    this.getUser();
  }


  updateUser = (userObject) => {
    console.log(userObject);
    this.setState({
      loggedIn: userObject.loggedIn,
      username: userObject.username,
      exerciseLogs: [...this.state.exerciseLogs, ...userObject.exerciseLogs]
    })
  }

  //keeps you logged in if you were to refresh
  getUser = () => {
    console.log("Triggered 34")
    axios.get('/api/dashboard/').then(response => {
      console.log('Get user response: ')
      console.log(response);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        console.log(response.data.user);
        this.setState({
          loggedIn: true,
          id: response.data.user._id,
          username: response.data.user.username,
          exerciseLogs: [...response.data.user.logs]
        })
      } else {
        console.log('Get user: no user');
        this.setState({ 
          loggedIn: false,
          username: null,
          exerciseLogs: []
        })
      }
    })
  } 

  render() {
    const { id, loggedIn, username, exerciseLogs } = this.state;
    console.log(this.state.loggedIn);
    return (
      <div className="App">
        {loggedIn ? <NavbarTrue updateUser={this.updateUser} loggedIn={loggedIn}  /> : <NavbarFalse updateUser={this.updateUser} loggedIn={loggedIn}  /> }
        {this.state.loggedIn && <Route exact path="/api/dashboard" render={ (props) => <Dashboard {...props} refreshUser={this.getUser} username={username} logs={exerciseLogs} id={id} /> } />}
        {!this.state.loggedIn && <Route exact path="/" render={ (props) => <Home {...props} /> } />}
        {/* Routes to different components */}
        <Route path="/api/login"
          render={() =>               
            <LoginForm updateUser={this.updateUser} />}
        />
        <Route path="/api/signup"
          render={() =>
            <Signup/>}
        />
      </div>
    );
  }
}

export default App;
