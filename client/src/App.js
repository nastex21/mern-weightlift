import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './helpers/history';
import { alertActions } from './actions/alert';
import { updateEvent } from './actions/items_actions';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import NavbarTrue from './components/navbartrue';
import NavbarFalse from './components/navbarfalse';
import Home from './components/home';
import Dashboard from './components/dashboard';
import gymSplash from './assets/images/dumbbell.jpg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      msg: null,
    }


    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  updateSuccess = () => {
    this.setState({
      sucess: true,
      msg: "Sucessfully registered! Please login."
    })
  }

  updateEventCalendar = () => {
    console.log(this.props);
    let eventsArr = [];
    this.props.dataModifier.weightLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Weights",
          "date": item.date,
          "color": "#d9534f",
          "collections": item.collections
        })
      }
    })
    this.props.dataModifier.cardioLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Cardio",
          "date": item.date,
          'color': '#0275d8',
          "collections": item.collections
        })
      }
    });

    this.props.dataModifier.bwLogs.map(function (item) {
      console.log(item);
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Bodyweight",
          "date": item.date,
          'color': '#5cb85c',
          "collections": item.collections
        })
      }
    });

    this.props.dataModifier.vidsLogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Classes/Videos",
          "date": item.date,
          'color': '#f0ad4e',
          "collections": item.collections
        })
      }
    });

    this.props.dispatch(updateEvent(eventsArr))
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

  render() {
    console.log("this.props");
    console.log(this.props);
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
        <Switch>
          <div className='App' style={!this.props.dataModifier.loggedIn ? style : loggedinStyle}>
            {this.props.dataModifier.loggedIn ? <NavbarTrue /> : <NavbarFalse />}
            {this.props.dataModifier.loggedIn ? <Route exact path="/api/dashboard" render={(props) => <Dashboard />} /> : null}
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route path="/api/login"
              render={() =>
                <LoginForm success={this.state.success} msg={this.state.msg} />}
            />
            <Route path="/api/signup"
              render={() =>
                <Signup updateSuccess={this.updateSuccess} />}
            />
          </div>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  const { alert, dataModifier, eventReducer } = state;
  return {
    alert,
    dataModifier,
    eventReducer
  };
}

export default connect(mapStateToProps)(App);