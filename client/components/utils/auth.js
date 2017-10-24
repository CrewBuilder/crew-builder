//TODO:
// -confirm promises handle the fetch get requests
// -check if myHeaders is required for Login or if access_token is all that is isRequired
// -cors support needed client side or will npm cors handle that?
// -add dynamic localhost/process.env.PORT access for fetch requests

// authResponse will be null or undefined if not there
// status "connected" OR IT WILL BE "unknown" IF NOT LOGGED IN

module.exports = {
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
  Login: () => {
    console.log('LOGIN TRIGGERED');
    return new Promise((resolve, reject) => {
      console.log('LOGIN PROMISE INITIALIZED');
      FB.login(result => {
        console.log('LOGIN FB.LOGIN RESULT:', result);
        if(result.authResponse) {
          // CORS ???
          var options = {
            method: 'POST',
            body: JSON.stringify({access_token: result.authResponse.accessToken}),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          };
          console.log(options);

          fetch('http://localhost:3000/auth/facebook', options)
          .then((res) => res.json())
          .then((data) => {
            console.log('LOGIN FETCH RES:', data);
            var token = data.headers.get('x-auth-token');
            if(token) {
              localStorage.setItem('id_token', token);
            }
            resolve(data);
          })
          .catch(() => reject());
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    })
  },
  // logout via FB method and removing localStorage 'id_token'
  Logout: () => {
    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        localStorage.removeItem('id_token');
        response.authResponse ? resolve(response) : reject(response);
      });
    });
  },
  // check current user from /auth/me API route
  GetCurrentUser: () => {
    let myHeaders = new Headers();
    let options = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    };
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:3000/auth/me`, options).then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}

