const getOptions = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('id_token')
  })
};

let postOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('id_token')
  }
};

const putOptions = {
  method: 'put',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('id_token')
  }
};

const deleteOptions = {
  method: 'delete',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('id_token')
  }
};
module.exports = {


  // Returns all of current user's crews. Will be rendered in sidebar view.
  GetUserCrews: (user_id, cb) => {
    let route = `/api/user/crews?user_id=${user_id}`;
    return fetch(route, getOptions)
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
    let route = `/api/user/tasks?user_id=${user_id}&crew_id=${crew_id}`;
    return fetch(route, getOptions)
    // TODO: test the data format of these API requests
      .then((response) => {
        return response.json();
      }).then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        cb(error, null);
      });
  },

  // Returns all of selected crew's tasks.
  GetCrewTasks: (crew_id, cb) => {
    let route = `/api/crew/tasks?crew_id=${crew_id}`;
    return fetch(route, getOptions)
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

  // Returns all available rewards for a Crew
  GetCrewRewards: (crew_id, cb) => {
    let route = `/crew/rewards?crew_id=${crew_id}`;
    return fetch(route, getOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        cb(error, null);
      });
  },

  // Returns all of a Crew's users
  GetCrewMembers: (crew_id, cb) => {
    let route = `/api/leader/members?crew_id=${crew_id}`;
    return fetch(route, getOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        cb(error, null);
      });
  },


  GetLeaderTasks: (crew_id, cb) => {
    let route = `/api/leader/tasks?crew_id=${crew_id}`;
    return fetch(route, getOptions)
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

  // Lets user create a Crew for which they will serve as leader
  PostCrew: (crew, user_id, cb) => {
    let route = '/api/crew/';
    let body = {
      crew_name: crew.crew_name,
      crew_description: crew.crew_description,
      crew_image: crew.crew_image,
      user_id: user_id
    };
    let options = postOptions;
    options.body = JSON.stringify(body);
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

  // Lets leader post task to crew. Should only be available to the Leader of that crew.
  PostTask: (task, crew_id, cb) => {
    let route = '/api/task/';
    let body = {
      task_name: task.task_name,
      task_description: task.task_description,
      limit: task.limit,
      expiry: task.expiry,
      crew_id: crew_id,
      points: task.points
    };
    let options = postOptions;
    options.body = JSON.stringify(body);
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

  // Lets leader post a new reward to their crew.
  PostReward: (reward, crew_id, cb) => {
    let route = '/api/reward/';
    let body = {
      name: reward.name,
      description: reward.description,
      limit: reward.limit,
      expiry: reward.expiry,
      crew_id: crew_id,
      points: reward.points
    };
    let options = postOptions;
    options.body = JSON.stringify(body);
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
    let route = qs === '' ? '/api/crews' : `/api/crews?qs=${qs}`;
    fetch(route, getOptions)
    // TODO: test the data format of these API requests
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        cb(error, null);
      });
  },

  // POSTs a new relation of User to Crew. User joins selected Crew.
  JoinACrew: (user_id, crew_id, cb) => {
    let route = '/api/user/crews/';
    let body = {
      user_id: user_id,
      crew_id: crew_id
    };
    let options = postOptions;
    options.body = JSON.stringify(body);
    return fetch(route, options)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((error) => {
        cb(error, null);
      });
  },

  // POSTs a new relation of User to Task. User claims selected Task
  ClaimATask: (user_id, task_id, cb) => {
    let route = '/api/user/tasks/';
    let body = {
      user_id: user_id,
      task_id: task_id
    };
    let options = postOptions;
    options.body = JSON.stringify(body);
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
    let route = '/api/user/tasks/';
    let body = {
      user_id: user_id,
      task_id: task_id,
      verified: verified
    };
    let options = putOptions;
    options.body = JSON.stringify(body);
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
    let route = '/api/user/crews/';
    let body = {
      id: user_id,
      crew_id: crew_id
    };
    let options = deleteOptions;
    options.body = JSON.stringify(body);
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
    let route = `/api/tasks?task_id=${task_id}`;
    let options = deleteOptions;
    return fetch(route, options)
      .then(response => {
        cb(null, response);
      })
      .catch((error) => {
        console.log('err', error);
        cb(error, null);
      });
  }
};