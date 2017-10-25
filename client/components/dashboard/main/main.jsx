import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import {GetCurrentUser} from '../../utils/auth.jsx';
import { getUserCrews, getUserTasks } from '../../utils/requests.jsx';

import CreateCrew from '../createCrew.jsx';
import SearchCard from '../../searchView/searchCard.jsx';

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
        <Route path="/dashboard/CreateCrew" currentPath="/dashboard" component={CreateCrew}/>
        <Route path="/dashboard/SearchCard" currentPath="/dashboard" component={SearchCard}/>
        <Link to="/dashboard/CreateCrew">
          CreateCrew with React
        </Link>
        <Link to="/dashboard/SearchCard">
          SearchCard with React
        </Link>
      </div>
    )
  }
}




        // <Switch>
        //   <Route exact path="/dashboard/xxx" component={CreateCrew}/>
        //   <Route path="/dashboard/yyy" component={SearchCard}/>
        //   <Redirect from="/dashboard" to="/dashboard/xxx"/>
        // </Switch>


    // if (this.state.user !== null) {
    //   return (
    //     <div>
    //      {this.props.user}
    //     </div>
    // )
    // } else {
    //   return (<div>Not logged in</div>)
    // }