module.exports = {

  // Returns all of current user's crews. Will be rendered in sidebar view.
  GetUserCrews: (user_id, cb) => {
    let route = `/user/crews?id=${user_id}`;
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
  GetUserTasks: (user_id, crew_id, cb) => {
    let route = `/user/tasks?id=${user_id}&crew_id=${crew_id}`;
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
    let route = `/crew/tasks?crew_id=${crew_id}`;
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
    let route = `/leader/members?crew_id=${crew_id}`;
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
    let route = `/leader/tasks?crew_id=${crew_id}`;
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
  PostCrew: (crew, user_id, cb) => {
    let route = '/crew/';
    let body = {
      name: crew.name,
      description: crew.description,
      image: crew.image,
      user_id: user_id
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
    let route = '/task/';
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
    let route = qs === '' ? '/crews' : `/crews?qs=${qs}`;

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
  JoinACrew: (user_id, crew_id, cb) => {
    let route = '/user/crews/';
    let body = {
      user_id: user_id,
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
  ClaimATask: (user_id, task_id, cb) => {
    let route = '/user/tasks/';
    let body = {
      user_id: user_id,
      task_id: task_id
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

  UpdateTask: (user_id, task_id, verified = false, cb) => {
    let route = '/user/tasks/';
    let body = {
      user_id: user_id,
      task_id: task_id,
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
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Delete UserCrew: removes User from Crew
  DeleteUserCrew: (user_id, crew_id, cb) => {
    let route = '/user/crews/';
    let body = {
      id: user_id,
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

  DeleteTask: (task_id, cb) => {
    let route = `${module.exports.host}tasks?task_id=${task_id}`;
    let options = {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };
    return fetch(route, options)
      .then(response => {
        console.log('delete successful')
        console.log(response, 'response')
        cb(null, response)
      })
      .catch((error) => {
        console.log('err', error)
        cb(error, null);
      })
  }
};