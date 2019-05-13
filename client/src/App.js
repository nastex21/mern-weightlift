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
      exerciseLogs: null
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
    this.setState(userObject)
  }

  getUser = () => {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          exerciseLogs: response.data.user.logs
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          exerciseLogs: null
        })
      }
    })
  }

  render() {
    const { loggedIn, username, exerciseLogs } = this.state;
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={loggedIn} location={this.props.location} />
        {/* greet user if logged in: */}
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
