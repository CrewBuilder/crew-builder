module.exports = {
  // Sets the path for 'fetches'
  host: process.env.HOST || 'http://localhost:3000/',

  // Returns all of current user's crews. Will be rendered in sidebar view.
  // Should only be used in 'main.jsx' to pass crew data to 'sidebar.jsx'
  GetUserCrews: (userId) => {
    let route = `${module.exports.host}user/crews?id=${userId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
      // TODO: test the data format of these API requests
      // .then((response) => {
      //   return response.json();
      // })
      .then((data) => {
        console.log(data);
        return data;
      }).catch((error) => console.log('ERROR', error));
  },

  // Returns all of current user's tasks. Will be rendered in crew view.
  // Should only be used in 'main.jsx' to pass task data to 'crewView'
  GetUserTasks: (userId, crewId) => {
    let route = `${module.exports.host}user/tasks?id=${userId}&crewId=${crewId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
    // TODO: test the data format of these API requests
    // .then((response) => {
    //   return response.json();
    // })
      .then((data) => {
        console.log(data);
        return data;
      }).catch((error) => console.log('ERROR', error));
  },

  // Returns all of current crew's tasks. Will be rendered in crew view.
  // Should only be used in 'crewView' to render tasks.
  GetCrewTasks: (crewId) => {
    let id = crewId;
    let route = `${module.exports.host}crew/tasks?crewId=${crewId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
    // TODO: test the data format of these API requests
    // .then((response) => {
    //   return response.json();
    // })
      .then((data) => {
        console.log(data);
        return data;
      }).catch((error) => console.log('ERROR', error));
  },


};
