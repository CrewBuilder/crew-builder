import React, { Component } from 'react';
import {GetCurrentUser} from '../../utils/auth.js';
import { getUserCrews, getUserTasks } from '../../utils/requests.js';

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



    if (this.state.user !== null) {
      return (
        <div>
         {this.props.user}
        </div>
    )
    } else {
      return (<div>Not logged in</div>)
    }

  }
}
