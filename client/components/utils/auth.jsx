//TODO:
// -confirm promises handle the fetch get requests
// -check if myHeaders is required for Login or if access_token is all that is isRequired
// -cors support needed client side or will npm cors handle that?
// -add dynamic localhost/process.env.PORT access for fetch requests

// authResponse will be null or undefined if not there
// status "connected" OR IT WILL BE "unknown" IF NOT LOGGED IN

module.exports = {

  host: process.env.HOST || 'http://localhost:3000/',
  // initialize Facebook SDK
  Init: () => {
    return new Promise((resolve, reject) => {
      if(typeof FB !== 'undefined') {
        resolve();
      } else {
      window.fbAsyncInit = function() {
        FB.init({
          appId            : '356644548109752',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.10'
        });
        // for accurate user counts and session time metrics in FB analytics
        FB.AppEvents.logPageView();
        resolve();
        // maybe do initial getLoginStatus
        // FB.getLoginStatus((response) => {
        //   console.log('INIT getLoginStatus:', response);
        // })
      };
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
      }
    })
  },
  // check login status either 'connected' OR 'unknown'
  CheckLogin: () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  // trigger FB login dialog popup and auth with /auth/facebook API route
  // add localStorage 'id_token'
  Login: (cb) => {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if(result.authResponse) {
          var options = {
            method: 'POST',
            body: JSON.stringify({access_token: result.authResponse.accessToken}),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          };

          fetch(`${module.exports.host}auth/facebook`, options)
          .then((data) => {
            var token = data.headers.get('x-auth-token');
            if(token) {
              localStorage.setItem('id_token', token);
            }
          })
          .then((loggedIn) => {
            cb('success');
            resolve();
          })
          .catch((e) => {
            cb(e);
            reject(e);
          });
        } else {
          cb('failure');
          reject(result);
        }
      }, {scope: 'public_profile,email'})
    })
  },
  // logout via FB method and removing localStorage 'id_token'
  Logout: () => {
    // LOOK INTO LOGGING OUT VIA FACEBOOK SERVER SIDE LATER

    // return new Promise((resolve, reject) => {
    //   FB.logout((response) => {
    //     localStorage.removeItem('id_token');
    //     response.authResponse ? resolve(response) : reject(response);
    //   });
    // });
    localStorage.removeItem('id_token');
    // REDIRECT
  },
  // check current user from /auth/me API route
  GetCurrentUser: () => {
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('id_token')
      })
    };
    return fetch(`${module.exports.host}auth/me`, options)
    .then((response) => {
      if(!response.ok){
        return false
      }
      return response.json();
    }).catch((error) => {
      return null;
    });
  }
}

