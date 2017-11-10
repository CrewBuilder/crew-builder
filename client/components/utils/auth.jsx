// handles FB init of sdk, login through FB, and retrieve user data
module.exports = {
  // initialize Facebook SDK
  Init: () => {
    return new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
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
    });
  },

  // trigger FB login dialog popup and auth with /auth/facebook API route
  // add localStorage 'id_token'
  Login: (cb) => {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          var options = {
            method: 'POST',
            body: JSON.stringify({access_token: result.authResponse.accessToken}),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          };

          localStorage.removeItem('id_token');
          fetch('/auth/facebook/', options)
            .then((data) => {
              var token = data.headers.get('x-auth-token');
              if (token) {
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
    });
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
    return fetch('/auth/me', options)
      .then((response) => {
        if (!response.ok) {
          return false;
        }
        return response.json();
      }).catch((error) => {
        return null;
      });
  }
};

