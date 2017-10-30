import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import {GetCurrentUser} from '../../utils/auth.jsx';
import { getUserCrews, getUserTasks } from '../../utils/requests.jsx';

import CreateCrew from '../forms/createCrew.jsx';
import SearchResults from './searchView/searchResults.jsx';
import CrewView from './crewView/crewView.jsx';
// added
import CrewLeaderView from './crewLeaderView/crewLeader.jsx';
//

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/dashboard/crews" render={(props) => (
          <CrewView {...props}
            user={this.props.user}
            currentCrew={this.props.currentCrew}
            userTasks={this.props.userTasks}
            />
          )}/>
          <Route exact path="/dashboard/newcrew" render={(props) => (
            <CreateCrew {...props}
            />
          )}/>
          <Route path="/dashboard/results" render={(props) => (
            <SearchResults {...props}
            searchResults={this.props.searchResults}
            searchField={this.props.searchField}
            />
          )}/>
        </Switch>
      </div>
    )
  }
}

