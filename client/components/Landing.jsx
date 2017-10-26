import React, { Component } from 'react';
import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.jsx';
import {Jumbotron, Button} from 'react-bootstrap';

const responseFacebook = (response) => {
  //TODO: re-direct, query users endpoint
}

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    function loginClickHandler(e) {
      e.preventDefault();
      window.location = "/auth/facebook"
    }
    return(
      <div>
        <Jumbotron>
          <h1>Crew Builder</h1>
          <p>Contribute to you crew...earn rewards</p>
          <p><Button onClick={Login} bsStyle="primary">Sign up with Facebook</Button></p>
      </Jumbotron>
      </div>

    )
  }
}
