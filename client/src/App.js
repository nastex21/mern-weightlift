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
      exerciseLogs: [],
      cardioLogs: [],
      bwLogs: [],
	    vidsLogs: []
    }

 componentDidMount() {
    this.getUser();
  }


  updateUser = (userObject) => {
    this.setState({
      id: userObject.id,
      loggedIn: userObject.loggedIn,
      username: userObject.username,
      exerciseLogs: [...this.state.exerciseLogs, ...userObject.exerciseLogs],
      cardioLogs: [...this.state.cardioLogs, ...userObject.cardioLogs],
      bwLogs: [...this.state.bwLogs, ...userObject.bwLogs],
      vidsLogs: [...this.state.vidsLogs, ...userObject.vidsLogs]
    })
  }

  //keeps you logged in if you were to refresh
  getUser = () => {
    axios.get('/api/dashboard/').then(response => {
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          id: response.data.user._id,
          username: response.data.user.username,
          exerciseLogs: [...response.data.user.logs],
          cardioLogs: [...response.data.user.cardiologs],
          bwLogs: [...response.data.user.bwlogs],
          vidsLogs: [...response.data.user.vidslogs]
        })
      } else {
        console.log('Get user: no user');
        this.setState({ 
          loggedIn: false,
          username: null,
          exerciseLogs: [],
          cardioLogs: [],
          bwLogs: [],
          vidsLogs: []
        })
      }
    })
  } 

  render() {
    const { id, loggedIn, username, exerciseLogs, cardioLogs, bwLogs, vidsLogs } = this.state;
    return (
      <div className="App">
        {loggedIn ? <NavbarTrue updateUser={this.updateUser} loggedIn={loggedIn}  /> : <NavbarFalse updateUser={this.updateUser} loggedIn={loggedIn}  /> }
        {this.state.loggedIn && <Route exact path="/api/dashboard" render={ (props) => <Dashboard {...props} refreshUser={this.getUser} username={username} logs={exerciseLogs} cardiologs={cardioLogs} bwlogs={bwLogs} vidslogs={vidsLogs} id={id} /> } />}
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
