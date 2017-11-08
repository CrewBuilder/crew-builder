import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import {GetCurrentUser} from '../../utils/auth.jsx';
import { getUserCrews, getUserTasks } from '../../utils/requests.jsx';

import CreateCrew from '../forms/createCrew.jsx';
import SearchResults from './searchView/searchResults.jsx';
import CrewView from './crewView/crewView.jsx';
import CrewLeaderView from './crewLeaderView/crewLeader.jsx';

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
              history={this.props.history}
              user={this.props.user}
              getCurrentCrews={this.props.getCurrentCrews}
              getUserTasks={this.props.getUserTasks}
              currentCrew={this.props.currentCrew}
              currentCrewTasks={this.props.currentCrewTasks}
              userTasks={this.props.userTasks}
              getCurrentRewards={this.props.getCurrentRewards}
              currentCrewRewards={this.props.currentCrewRewards}
            />
          )}/>
          <Route path="/dashboard/manage" render={(props) => (
            <CrewLeaderView {...props}
              history={this.props.history}
              user={this.props.user}
              getCurrentCrews={this.props.getCurrentCrews}
              getUserTasks={this.props.getUserTasks}
              getCrewTasks={this.props.getCrewTasks}
              currentCrew={this.props.currentCrew}
              currentCrewTasks={this.props.currentCrewTasks}
              currentCrewRewards={this.props.currentCrewRewards}
              currentTasksToConfirm={this.props.currentTasksToConfirm}
              handleMemberRequestVerification={this.props.handleMemberRequestVerification}
              userTasks={this.props.userTasks}
              getCurrentRewards={this.props.getCurrentRewards}
            />
          )}/>
          <Route exact path="/dashboard/newcrew" render={(props) => (
            <CreateCrew {...props}
              history={this.props.history}
              user={this.props.user}
              currentCrew={this.props.currentCrew}
              getCurrentCrews={this.props.getCurrentCrews}
              newCrew={true}
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

