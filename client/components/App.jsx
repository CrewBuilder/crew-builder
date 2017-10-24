import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Landing from './Landing.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import Sidebar from './dashboard/sidebar.jsx';

import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.js';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: false
      }
    }

  componentDidMount() {
    // Initializes facebook sdk - required for other FB functions(login,logout,etc)
    // may need to incorporate further throughout individual app routes?
    Init();
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            this.state.isLoggedIn ? (
              <Redirect to="/dashboard"/>
            ) : (
              <Landing/>
            )
          )}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
        <button onClick={Login}>facebook login</button>
        <button onClick={Logout}>facebook logout</button>
      </div>
    )
  }
}