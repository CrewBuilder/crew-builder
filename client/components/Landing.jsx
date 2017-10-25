import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.jsx';

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

      <button onClick={Login}>facebook login</button>
      <button onClick={Logout}>facebook logout</button>
      <button onClick={GetCurrentUser}>facebook getCurrentUser</button>
        <div onClick={loginClickHandler}>
          Continue with Facebook
        </div>
      </div>

    )
  }
}
