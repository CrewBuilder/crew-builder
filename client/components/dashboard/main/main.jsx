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
              getCurrentCrews={this.props.getCurrentCrews}
              getUserTasks={this.props.getUserTasks}
              currentCrew={this.props.currentCrew}
              currentCrewTasks={this.props.currentCrewTasks}
              userTasks={this.props.userTasks}
              setCurrentCrew={this.props.setCurrentCrew}
            />
          )}/>
          <Route path="/dashboard/manage" render={(props) => (
            <CrewLeaderView {...props}
              user={this.props.user}
              getCurrentCrews={this.props.getCurrentCrews}
              getUserTasks={this.props.getUserTasks}
              currentCrew={this.props.currentCrew}
              currentCrewTasks={this.props.currentCrewTasks}
              currentCrewRewards={this.props.currentCrewRewards}
              currentTasksToConfirm={this.props.currentTasksToConfirm}
              handleMemberRequestVerification={this.props.handleMemberRequestVerification}
              userTasks={this.props.userTasks}
              setCurrentCrew={this.props.setCurrentCrew}
            />
          )}/>
          <Route exact path="/dashboard/newcrew" render={(props) => (
            <CreateCrew {...props}
              user={this.props.user}
              getCurrentCrews={this.props.getCurrentCrews}
            />
          )}/>
          <Route path="/dashboard/results" render={(props) => (
            <SearchResults {...props}
              user={this.props.user}
              getCurrentCrews={this.props.getCurrentCrews}
              currentCrewTasks={this.props.currentCrewTasks}
              searchResults={this.props.searchResults}
              searchField={this.props.searchField}
            />
          )}/>
        </Switch>
      </div>
    );
  }
}

