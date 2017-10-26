import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import {GetCurrentUser} from '../../utils/auth.jsx';
import { getUserCrews, getUserTasks } from '../../utils/requests.jsx';

import CreateCrew from '../createCrew.jsx';
import SearchResults from './searchView/searchResults.jsx';
import CrewView from './crewView/crewView.jsx';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userCrews: null,
      userTasks: null,
    }
  }

  componentDidMount() {

  }

  render() {
    if(this.props.isSearching){
      return (
        <div>
          <SearchResults />
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/dashboard/newcrew">
            CreateCrew with React
          </Link>
          <Link to="/dashboard/results">
            SearchResults with React
          </Link>
          <CrewView />
          <Switch>
          <Route path="/dashboard/newcrew" currentPath="/dashboard" component={CreateCrew}/>
          <Route path="/dashboard/results" currentPath="/dashboard" component={SearchResults}/>
          </Switch>
        </div>
      )
    }
  }
}
