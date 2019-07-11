import React, { Component } from 'react';
import axios from 'axios';
import { Route} from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import NavbarTrue from './components/navbartrue';
import NavbarFalse from './components/navbarfalse';
import Home from './components/home';
import Dashboard from './components/dashboard';
import gymSplash from './assets/images/dumbbell.jpg';

class App extends Component {
  state = {
    id: null,
    loggedIn: null,
    username: null,
    exerciseLogs: [],
    cardioLogs: [],
    bwLogs: [],
    vidsLogs: [],
    events: [],
    success: false,
    msg: null
  }

  componentDidMount() {
    this.getUser();
  }

  updateSuccess = () => {
    console.log("updateSuccess");
    this.setState({
      sucess: true,
      msg: "Sucessfully registered! Please login."
    })
  }

  updateEventCalendar = () => {
    let eventsArr = [];
    console.log("this.state.exerciselogs");
    console.log(this.state.exerciseLogs);
    this.state.exerciseLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Weights",
          "date": item.date,
          "color": "#d9534f",
          "collections": item.collections
        })
      }
    })
    this.state.cardioLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Cardio",
          "date": item.date,
          'color': '#0275d8',
          "collections": item.collections
        })
      }
    });

    this.state.bwLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Bodyweight",
          "date": item.date,
          'color': '#5cb85c',
          "collections": item.collections
        })
      }
    });

    this.state.vidsLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Classes/Videos",
          "date": item.date,
          'color': '#f0ad4e',
          "collections": item.collections
        })
      }
    });

    this.setState({
      events: [...eventsArr]
    })
  }

 createDate = (date) => {
    let newDate = new Date(date);
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1;
    var d = newDate.getDate();
    if (Number(d) < 10 && Number(d) > 0) {
        d = "0" + d;
    }

    if (Number(m) < 10 && Number(m) > 0) {
        m = "0" + m;
    }
    const nowDate = y + "-" + m + "-" + d;

    return nowDate;
}

  updateUser = (userObject) => {
    console.log("triggered updateuser")
    this.setState({
      id: userObject.id,
      loggedIn: userObject.loggedIn,
      username: userObject.username,
      exerciseLogs: [...this.state.exerciseLogs, ...userObject.exerciseLogs],
      cardioLogs: [...this.state.cardioLogs, ...userObject.cardioLogs],
      bwLogs: [...this.state.bwLogs, ...userObject.bwLogs],
      vidsLogs: [...this.state.vidsLogs, ...userObject.vidsLogs]
    }
    )
  }

  //keeps you logged in if you were to refresh
  getUser = () => {
    console.log("GETUSER")
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
        }, this.updateEventCalendar)
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
    const style = {
      backgroundImage: `url(${gymSplash})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  }

  
  console.log("events");
  console.log(this.state.events)

    const loggedinStyle = {

    }
    return (
      <div className='App' style={!loggedIn ? style :loggedinStyle}>
        {loggedIn ? <NavbarTrue updateUser={this.updateUser} loggedIn={loggedIn} /> : <NavbarFalse updateUser={this.updateUser} loggedIn={loggedIn} />}
        {this.state.loggedIn && <Route exact path="/api/dashboard" render={(props) => <Dashboard {...props}refreshUser={this.getUser} username={username} logs={exerciseLogs} cardiologs={cardioLogs} bwlogs={bwLogs} vidslogs={vidsLogs} id={id} getLogs={this.getLogs} events={this.state.events} />}  />}
        {!this.state.loggedIn && <Route exact path="/" render={(props) => <Home {...props} />} />}
        {/* Routes to different components */}
        <Route path="/api/login"
          render={() =>
            <LoginForm updateUser={this.updateUser} success={this.state.success} msg={this.state.msg} />}
        />
        <Route path="/api/signup"
          render={() =>
            <Signup updateSuccess={this.updateSuccess} />}
        />
      </div>
    );
  }
}

export default App;
