module.exports = {
  // Sets the path for 'fetches'
  host: process.env.HOST || 'http://localhost:3000/',

  // Returns all of current user's crews. Will be rendered in sidebar view.
  GetUserCrews: (userId, cb) => {
    let route = `${module.exports.host}user/crews?id=${userId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(data);
      }).catch((error) => console.log('ERROR', error));
  },

  // Returns all of current user's tasks for selected crew.
  GetUserTasks: (userId, crewId, cb) => {
    let route = `${module.exports.host}user/tasks?id=${userId}&crewId=${crewId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
    // TODO: test the data format of these API requests
      .then((response) => {
        return response.json();
      }).then(data => {
        cb(data);
      })
      .catch((error) => console.log('ERROR', error));
  },

  // Returns all of selected crew's tasks.
  GetCrewTasks: (crewId, cb) => {
    let id = crewId;
    let route = `${module.exports.host}crew/tasks?crewId=${crewId}`;
    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(route, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(data);
      }).catch((error) => console.log('ERROR', error));
  },

  // Lets user create a Crew for which they will serve as leader
  PostCrew: (crew, userId, cb) => {
    let route = `${module.exports.host}crew/`;

  }



}
