import React, { Component } from 'react';

import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.jsx';
import {Jumbotron, Button} from 'react-bootstrap';

const responseFacebook = (response) => {
  //TODO: re-direct, query users endpoint
}

export default class Landing extends Component {

  constructor(props) {
    super(props);

    // triggers login and app state change to redirect to dashboard
    this.handleLogin = () => {
      let userCheck = window.localStorage.getItem('id_token');
      if(userCheck) {
        window.localStorage.removeItem('id_token');
      }
      Login((res) => {
        return res;
      })
      .then((loggedIn) => {
        this.props.changeLoginStatus();
      })
      .catch((error) => {
        console.log('Login Error: ', error);
      })
    }
  }

  render() {

    return(
      <div>
        <Jumbotron>
          <h1>Crew Builder</h1>
          <p>Contribute to you crew...earn rewards</p>
          <p><Button onClick={this.handleLogin} bsStyle="primary">Sign up with Facebook</Button></p>
        </Jumbotron>
      </div>
    )
  }
}
