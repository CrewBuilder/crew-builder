import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import {GetCurrentUser} from '../../utils/auth.jsx';
import { getUserCrews, getUserTasks } from '../../utils/requests.jsx';

import CreateCrew from '../forms/createCrew.jsx';
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
      return (
        <div>
          <Switch>
            <Route path="/dashboard/crewview" currentPath="/dashboard" component={CrewView}/>
            <Route path="/dashboard/results" currentPath="/dashboard" component={SearchResults}/>
          </Switch>
        </div>
      )

  }
}

    // if(this.props.isSearching){
    //   return (
    //     <div>
    //       <Switch>
    //         <Route path="/dashboard/newcrew" currentPath="/dashboard" component={CreateCrew}/>
    //         <Route path="/dashboard/results" currentPath="/dashboard" component={SearchResults}/>
    //       </Switch>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //       <CrewView />
    //     </div>
    //   )
    // }


// <div>
//   <Link to="/dashboard/newcrew">
//     CreateCrew with React
//   </Link>
//   <Link to="/dashboard/results">
//     SearchResults with React
//   </Link>
//   <CrewView />
//   <Switch>
//   <Route path="/dashboard/newcrew" currentPath="/dashboard" component={CreateCrew}/>
//   <Route path="/dashboard/results" currentPath="/dashboard" component={SearchResults}/>
//   </Switch>
// </div>
          // <SearchResults/>