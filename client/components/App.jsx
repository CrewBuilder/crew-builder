import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Landing from './Landing.jsx';
import Dashboard from './dashboard/dashboard.jsx';

import { Init, GetCurrentUser } from './utils/auth.jsx';

// main component for handling landing page/redirect to dashboard by checking login status
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

    // check auth through api using localStorage 'id_token'
    this.authLogin = () => {
      let userCheck = window.localStorage.getItem('id_token');
      if (userCheck) {
        GetCurrentUser((res) => {
          return res;
        })
          .then((user) => {
            if (!user) {
              window.location.reload();
            } else {
              this.setState({
                isLoggedIn: true
              });
            }
          });
      }
      return this.state.isLoggedIn;
    };

    // will log out/remove token or change state for log in
    this.changeLoginStatus = () => {
      if (this.state.isLoggedIn) {
        let userCheck = window.localStorage.getItem('id_token');
        if (userCheck) {
          window.localStorage.removeItem('id_token');
        }
      }
      this.setState({
        isLoggedIn: !this.state.isLoggedIn
      });
    };
  }

  componentDidMount() {
    // Initializes facebook sdk and checks for login status
    Init();
    this.authLogin();
  }

  render() {
    if (!this.state.isLoggedIn || !window.localStorage.getItem('id_token')) {
      return (
        <div>
          <Switch>
            <Route exact path="/" render={(props) => (
              <Landing {...props}
                changeLoginStatus={this.changeLoginStatus}
              />
            )}/>
            <Redirect to="/" />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="fadeIn-container">
          <Switch>
            <Route path="/dashboard" render={(props) => (
              <Dashboard {...props}
                isLoggedIn={this.state.isLoggedIn}
                changeLoginStatus={this.changeLoginStatus}
              />
            )}/>
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      );
    }
  }
}
