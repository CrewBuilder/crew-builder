import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.checkLogin = () => {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        console.log('response',response);
      });


    }

  }

  render() {
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
    function componentClicked(e) {
      console.log('e',e)
    }
    return(
      <div>
        <FacebookLogin
          appId="356644548109752"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} />,
      </div>
    )
  }
}

