import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Landing from './Landing.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import Sidebar from './dashboard/sidebar.jsx';

import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.jsx';
import PrivateRoute from './utils/private.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: false
      }
      // check auth with local token
      this.authLogin = (callback) => {
        let userCheck = window.localStorage.getItem('id_token');
        if(userCheck) {
          GetCurrentUser((res) => {
            return res;
          })
          .then((user) => {
            if (user === false) {
              window.reload.location();
            } else {
              this.setState({isLoggedIn: true});
            }
          });
        }
        return this.state.isLoggedIn;
      }

      // will log out/remove token or change state for log in
      this.changeLoginStatus = () => {
        if(this.state.isLoggedIn) {
          let userCheck = window.localStorage.getItem('id_token');
          if(userCheck) {
            window.localStorage.removeItem('id_token');
          }
        }
        this.setState({isLoggedIn: !this.state.isLoggedIn});
      }

    }

  componentDidMount() {
    // Initializes facebook sdk
    Init();
    this.authLogin();
  }

  render() {

    if(!this.state.isLoggedIn) {
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
      )

    } else {

      return (
        <div>
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
      )
    }
  }
}
