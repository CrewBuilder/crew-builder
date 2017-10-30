import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard.jsx';
import Landing from '../Landing.jsx';

import { GetCurrentUser } from './auth.jsx';

// Redirects to '/' (i.e., Landing) if checkAuth returns false...
// if 'landing' and checkAuth is true, redirect to '/dashboard' - NECESSARY TO TEST WITH DATA?
// TODO: add GetCurrentUser function to check server for login status of 'id_token' on localStorage if present
const PrivateRoute = ({ component: Component, currentUser, checkAuth, name }) => {

  // GetCurrentUser((res) => {
  //   return res;
  // })
  // .then((user) => {
  //   if (user === false) {
  //     console.log('PRIVATE', 'NOT LOGGED IN')
  //   } else {
  //     console.log('PRIVATE', user);
  //   }
  // });


  // if(name === 'landing') {
  //   if(checkAuth && currentUser) {
  //     return(
  //         (
  //         <Route render={(props) => (
  //           (
  //             <Redirect to={{
  //               pathname: '/dashboard'
  //             }}/>
  //           )
  //         )}/>
  //       )
  //     )
  //   } else {
  //     return(
  //         (
  //         <Route render={(props) => (
  //           (
  //             <Landing {...props}/>
  //           )
  //         )}/>
  //       )
  //     )
  //   }
  // }

  // return(
  //     (
  //     <Route render={(props) => (
  //       checkAuth ? (
  //         <Component {...props}/>
  //       ) : (
  //         <Route render={(props) => (
  //         (
  //           <Landing {...props}/>
  //         )
  //       )}/>
  //       )
  //     )}/>
  //   )
  // )



  return(
      (
      <Route render={(props) => (
        checkAuth ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/'
          }}/>
        )
      )}/>
    )
  )
}
export default PrivateRoute;
