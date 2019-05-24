import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';
import Dashboard from './components/dashboard';

class App extends Component {
    state = {
      loggedIn: false,
      username: null,
      exerciseLogs: []
    }

 componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
      console.log(this.props.location)
    }
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
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        console.log(response.data.user);
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          exerciseLogs: [...this.state.exerciseLogs, ...response.data.user.logs]
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
    const { loggedIn, username, exerciseLogs } = this.state;
    console.log(exerciseLogs);
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={loggedIn} location={this.props.location} />
        {this.state.loggedIn && <Route exact path="/dashboard" render={ (props) => <Dashboard {...props} username={username} logs={exerciseLogs} /> } />}
        {/* Routes to different components */}
        <Route exact path="/" component={Home} />
        <Route path="/login"
          render={() =>
            <LoginForm updateUser={this.updateUser} />}
        />
        <Route path="/signup"
          render={() =>
            <Signup/>}
        />
      </div>
    );
  }
}

export default App;
