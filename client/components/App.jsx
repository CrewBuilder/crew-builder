import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  //TODO: re-direct
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    }

  render() {
    function checkLoginState(e) {
      e.preventDefault()
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
    function componentClicked(e) {
      console.log('Clicked login!');
    }
    function logoutClickHandler(e) {
      e.preventDefault()
      FB.logout(function(response) {
        console.log('logged out', response);
      });
    }
    return(
      <div>
        <FacebookLogin
          appId="356644548109752" //TODO: hide this potentially sensitive info
          autoLoad={true}
          fields="name,email,picture" // TODO: subject to change if different fields are required
          onClick={componentClicked}
          callback={responseFacebook} />
        <button onClick={logoutClickHandler}>Logout</button>
      </div>
    )
  }
}

