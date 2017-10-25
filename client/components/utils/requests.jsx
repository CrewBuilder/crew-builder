module.exports = {
  // Sets the path for 'fetches'
    host: process.env.HOST || 'http://localhost:3000/',

    // Returns all of current user's crews. Will be rendered in sidebar view.
    // Should only be used in 'main.jsx' to pass crew data to 'sidebar.jsx'
    getUserCrews: () => {
      let id = this.state.user.id;
      let route = host + 'user/crews?id=' + id;
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
        return this.setState({userCrews: data});
      }).catch((error) => console.log('ERROR', error));
    },

    // Returns all of current user's tasks. Will be rendered in crew view.
    // Should only be used in 'main.jsx' to pass task data to 'crewView'
    getUserTasks: () => {
      let id = this.state.user.id;
      let route = host + 'user/tasks?id=' + id;
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
        return this.setState({userTasks: data});
      }).catch((error) => console.log('ERROR', error));
    },

    // Returns all of current crew's tasks. Will be rendered in crew view.
    // Should only be used in 'crewView' to render tasks.
    getCrewTasks: () => {
      let id = this.state.crew.id
      let route = host + 'crew/tasks?crewId=' + id;
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
        return this.setState({crewTasks: data});
      }).catch((error) => console.log('ERROR', error));
    }
}
