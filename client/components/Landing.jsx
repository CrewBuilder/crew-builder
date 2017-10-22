import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

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
        <div onClick={loginClickHandler}>
          Continue with Facebook
        </div>
      </div>

    )
  }
}
