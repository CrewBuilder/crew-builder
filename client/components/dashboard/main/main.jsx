import React, { Component } from 'react';
import auth, {GetCurrentUser} from '../../utils/auth.js';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userCrews: null,
      userTasks: null,
    }
    // Sets the path for 'fetches'
    let url = process.env.HOST || 'http://localhost:3000/';

    // Returns all of current user's crews. Will be rendered in sidebar view.
    this.getUserCrews = () => {
      let path = url + 'user/crews';
      let options = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
      return fetch(path, options)
      // TODO: test the data format of these API requests
      // .then((response) => {
      //   return response.json();
      // })
      .then((data) => {
        console.log(data);
        return this.setState({userCrews: data});
      }).catch((error) => console.log('ERROR', error));
    }

    // Returns all of current user's tasks. Will be rendered in crew view.
    this.getUserTasks = () => {
      let path = url + 'user/tasks';
      let options = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
      return fetch(path, options)
      // TODO: test the data format of these API requests
      // .then((response) => {
      //   return response.json();
      // })
      .then((data) => {
        console.log(data);
        return this.setState({userTasks: data});
      }).catch((error) => console.log('ERROR', error));
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
