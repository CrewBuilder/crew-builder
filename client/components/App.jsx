import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.jsx';
import Sidebar from './dashboard/sidebar.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: false
      }
    }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            this.state.isLoggedIn ? (
              <Redirect to="/dashboard"/>
            ) : (
              <Sidebar/>
            )
          )}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    )
  }
}