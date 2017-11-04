module.exports = {
  // Sets the path for 'fetches'
  host: process.env.HOST || '/',

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
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Returns all of current user's tasks for selected crew.
  GetUserTasks: (userId, crew_id, cb) => {
    let route = `${module.exports.host}user/tasks?id=${userId}&crew_id=${crew_id}`;
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
      }).then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Returns all of selected crew's tasks.
  GetCrewTasks: (crew_id, cb) => {
    let id = crew_id;
    let route = `${module.exports.host}crew/tasks?crew_id=${crew_id}`;
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
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error)
        cb(error, null);
      });
  },

  // Returns all of a Crew's users
  GetCrewMembers: (crew_id, cb) => {
    let id = crew_id;
    let route = `${module.exports.host}leader/members?crew_id=${crew_id}`;
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
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  GetLeaderTasks: (crew_id, cb) => {
    let route = `${module.exports.host}leader/tasks?crew_id=${crew_id}`;
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
      })
      .catch((error) => console.log('Unable to fetch leader/tasks', error));
  },

  // Lets user create a Crew for which they will serve as leader
  PostCrew: (crew, userId, cb) => {
    let route = `${module.exports.host}crew/`;
    let body = {
      name: crew.name,
      description: crew.description,
      image: crew.image,
      userId: userId
    };
    let options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Let's user post task to crew. Should only be available to the Leader of that crew.
  PostTask: (task, crew_id, cb) => {
    let route = `${module.exports.host}task/`;
    let body = {
      name: task.name,
      description: task.description,
      limit: task.limit,
      expiry: task.expiry,
      crew_id: crew_id,
      points: task.points
    };
    let options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Returns all crews. Meant for Browse functionality
  GetAllCrews: (qs, cb) => {
    let route = qs === '' ? `${module.exports.host}crews` : `${module.exports.host}crews?qs=${qs}`;

    let options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    fetch(route, options)
    // TODO: test the data format of these API requests
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // POSTs a new relation of User to Crew. User joins selected Crew.
  JoinACrew: (userId, crew_id, cb) => {
    let route = `${module.exports.host}user/crews/`;
    let body = {
      userId: userId,
      crew_id: crew_id
    };
    let options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    return fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // POSTs a new relation of User to Task. User claims selected Task
  ClaimATask: (userId, taskId, cb) => {
    let route = `${module.exports.host}user/tasks/`;
    let body = {
      userId: userId,
      taskId: taskId
    };
    let options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  UpdateTask: (userTaskId, cb, verified = false) => {
    let route = `${module.exports.host}user/tasks/`;
    let body = {
      userTaskId: userTaskId,
      verified: verified
    };
    let options = {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        cb(data);
      })
      .catch(err =>
        cb(err));
  },

  // Delete UserCrew: removes User from Crew
  DeleteUserCrew: (userId, crew_id, cb) => {
    let route = `${module.exports.host}user/crews/`;
    let body = {
      id: userId,
      crew_id: crew_id
    };
    let options = {
      method: 'delete',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    return fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // DeleteCrewTask: (taskId, crew_id, cb) => {
  //   let route = `${module.exports.host}tasks/`;
  //   let body = {
  //     id: taskId,
  //     crew_id: crew_id
  //   };
  //   let options = {
  //     method: 'delete',
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   return fetch(route, options)
  //     .then(response => {
  //       console.log('======')
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('--------')
  //       cb(null, data);
  //     })
  //     .catch((error) => {
  //       console.log('err', error)
  //       cb(error, null);
  //     })
  // }
};