// import React from 'react';
// import ReactDOM from 'react-dom';
// import FacebookLogin from 'react-facebook-login';

// const responseFacebook = (response) => {
//   //TODO: re-direct, query users endpoint
// }

// export default class Landing extends React.Component {
//   constructor(props) {
//     super(props);

//     }

//   render() {

//     function loginClickHandler(e) {
//       e.preventDefault();
//       window.location = "/auth/facebook"
//     }
//     function logoutClickHandler(e) {
//       e.preventDefault();
//       // TODO: Make this logout work correctly
//       // FB.logout(function(response) {
//       //   console.log('logged out', response);
//       // });
//     }

//     return(
//       <div>

//         <button onClick={loginClickHandler}>Login with FB</button>

//         <button onClick={logoutClickHandler}>Logout of FB</button>
//       </div>
//     )
//   }
// }
// /* Old FB button
//     <FacebookLogin
//         appId="356644548109752" //TODO: hide this potentially sensitive info
//         autoLoad={true}
//         fields="name,email,picture" // TODO: subject to change if different fields are required
//         onClick={loginClickHandler}
//         callback={responseFacebook} />
// */

