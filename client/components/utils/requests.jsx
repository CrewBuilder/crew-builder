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
  GetUserCrews: (userId, cb) => {
    let route = `/user/crews?id=${userId}`;
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
  GetUserTasks: (userId, crew_id, cb) => {
    let route = `/user/tasks?id=${userId}&crew_id=${crew_id}`;
    return fetch(route, getOptions)
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
    let route = `/crew/tasks?crew_id=${crew_id}`;
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
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // Returns all of a Crew's users
  GetCrewMembers: (crew_id, cb) => {
    let route = `/leader/members?crew_id=${crew_id}`;
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


  GetLeaderTasks: (crew_id, cb) => {
    let route = `/leader/tasks?crew_id=${crew_id}`;
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
  PostCrew: (crew, userId, cb) => {
    let route = '/crew/';
    let body = {
      name: crew.name,
      description: crew.description,
      image: crew.image,
      userId: userId
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
    let route = '/task/';
    let body = {
      name: task.name,
      description: task.description,
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
    let route = '/crew/rewards';
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
    let route = qs === '' ? '/crews' : `/crews?qs=${qs}`;
    fetch(route, getOptions)
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
    let route = '/user/crews/';
    let body = {
      userId: userId,
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
        console.log('ERROR', error);
        cb(error, null);
      });
  },

  // POSTs a new relation of User to Task. User claims selected Task
  ClaimATask: (userId, taskId, cb) => {
    let route = '/user/tasks/';
    let body = {
      userId: userId,
      taskId: taskId
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

  UpdateTask: (userTaskId, verified = false, cb) => {
    let route = '/user/tasks/';
    let body = {
      userTaskId: userTaskId,
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

  ClaimReward: (reward_id, email, user_id, crew_id, points, cb) => {
    let route = '/reward/claim';
    let body = {
      reward_id: reward_id,
      email: email,
      user_id: user_id,
      crew_id: crew_id,
      points: points
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
  DeleteUserCrew: (userId, crew_id, cb) => {
    let route = '/user/crews/';
    let body = {
      id: userId,
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

  // Delete LeaderCrew: Deletes Crew from leader
  DeleteLeaderCrew: (crew_id, cb) => {
    let route = `/crew?crew_id=${crew_id}`;
    let body = {
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

  DeleteTask: (taskId, cb) => {
    let route = `/tasks?taskId=${taskId}`;
    let body = {
      taskId: taskId
    };
    let options = deleteOptions;
    options.body = JSON.stringify(body);
    return fetch(route, options)
      .then(response => {
        cb(null, response);
      })
      .catch((error) => {
        console.log('err', error);
        cb(error, null);
      });
  },

  DeleteReward: (rewardId, cb) => {
    let route = `/crew/rewards?reward_id=${rewardId}`;
    let body = {
      rewardId: rewardId
    };
    let options = deleteOptions;
    options.body = JSON.stringify(body);
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