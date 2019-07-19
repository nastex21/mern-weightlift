import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import { history } from './helpers/history';
import { alertActions } from './actions/alert';
import { userActions } from './actions/user_actions';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import NavbarTrue from './components/navbartrue';
import NavbarFalse from './components/navbarfalse';
import Home from './components/home';
import Dashboard from './components/dashboard';
import gymSplash from './assets/images/dumbbell.jpg';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      loggedIn: this.props.loggedIn,
      username: null,
      exerciseLogs: [],
      cardioLogs: [],
      bwLogs: [],
      vidsLogs: [],
      events: [],
      eventsFiltered: [],
      success: false,
      msg: null,
      cardioFilterFlag: false,
      weightFilterFlag: false,
      bwFilterFlag: false,
      vidsFilterFlag: false
    }
    

  const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    }); 
  }

  filteredEvents = (num) => {

    if (num == 1) {
      if (this.state.weightFilterFlag) {
        var filtered = this.state.eventsFiltered.filter(function (item) {
          return item.title !== "Weights"
        })


        this.setState({
          eventsFiltered: [...filtered]
        })

      } else {
        var filtered = this.state.events.filter(function (item) {
          return item.title == "Weights"
        })

        this.setState({
          eventsFiltered: [...this.state.eventsFiltered, ...filtered]
        })
      }
    }

    if (num == 2) {
      if (this.state.cardioFilterFlag) {
        var filtered = this.state.eventsFiltered.filter(function (item) {
          return item.title !== "Cardio"
        })

        this.setState({
          eventsFiltered: [...filtered]
        })

      } else {
        var filtered = this.state.events.filter(function (item) {
          return item.title == "Cardio"
        })

        this.setState({
          eventsFiltered: [...this.state.eventsFiltered, ...filtered]
        })
      }
    }

    if (num == 3) {
      if (this.state.bwFilterFlag) {
        var filtered = this.state.eventsFiltered.filter(function (item) {
          return item.title !== "Bodyweight"
        })

        this.setState({
          eventsFiltered: [...filtered]
        })
      } else {
        var filtered = this.state.events.filter(function (item) {
          return item.title == "Bodyweight"
        })

        this.setState({
          eventsFiltered: [...this.state.eventsFiltered, ...filtered]
        })
      }
    }

    if (num == 4) {
      if (this.state.vidsFilterFlag) {
        var filtered = this.state.eventsFiltered.filter(function (item) {
          return item.title !== "Classes/Videos"
        })

        this.setState({
          eventsFiltered: [...filtered]
        })
      } else {
        var filtered = this.state.events.filter(function (item) {
          return item.title == "Classes/Videos"
        })

        this.setState({
          eventsFiltered: [...this.state.eventsFiltered, ...filtered]
        })
      }
    }
  }

  filterButton = (num) => {

    if (num == 1) {
      this.setState(prevState => ({
        weightFilterFlag: !prevState.weightFilterFlag
      }), () => this.filteredEvents(num))
    }

    if (num == 2) {
      this.setState(prevState => ({
        cardioFilterFlag: !prevState.cardioFilterFlag
      }), () => this.filteredEvents(num))
    }

    if (num == 3) {
      this.setState(prevState => ({
        bwFilterFlag: !prevState.bwFilterFlag
      }), () => this.filteredEvents(num))
    }

    if (num == 4) {
      this.setState(prevState => ({
        vidsFilterFlag: !prevState.vidsFilterFlag
      }), () => this.filteredEvents(num))
    }
  }

  updateSuccess = () => {
    this.setState({
      sucess: true,
      msg: "Sucessfully registered! Please login."
    })
  }

  updateEventCalendar = () => {
    let eventsArr = [];
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
      events: [...eventsArr],
      eventsFiltered: [...eventsArr]
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
    /*    axios.get('/api/dashboard/').then(response => {
   
         if (response.data.user) {
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
           this.setState({
             loggedIn: false,
             username: null,
             exerciseLogs: [],
             cardioLogs: [],
             bwLogs: [],
             vidsLogs: []
           })
         }
       }) */
  }

  render() {
    console.log(localStorage.getItem('user'));
    console.log("this.props");
    console.log(this.props);
    const { id, username, exerciseLogs, cardioLogs, bwLogs, vidsLogs } = this.state;
    const { loggedIn } = this.props;
    const style = {
      backgroundImage: `url(${gymSplash})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }

    const loggedinStyle = {

    }
    return (
      <Router history={history}>
        <div className='App' style={!loggedIn ? style : loggedinStyle}>
          {loggedIn ? <NavbarTrue updateUser={this.updateUser} /> : <NavbarFalse />}
          {loggedIn ? <Route exact path="/api/dashboard" render={(props) => <Dashboard refreshUser={this.getUser} username={username} id={id} getLogs={this.getLogs} filterButton={(num) => this.filterButton(num)} events={this.state.weightFilterFlag == true || this.state.cardioFilterFlag == true || this.state.bwFilterFlag == true || this.state.vidsFilterFlag == true ? this.state.eventsFiltered : this.state.events} />} /> : null}
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/api/login"
            render={() =>
              <LoginForm updateUser={this.updateUser} success={this.state.success} msg={this.state.msg} />}
          />
          <Route path="/api/signup"
            render={() =>
              <Signup updateSuccess={this.updateSuccess} />}
          />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  const { loggedIn } = state.authenticate;
  const { alert } = state;
  return {
    loggedIn,
    alert
  };
}

export default connect(mapStateToProps)(App);