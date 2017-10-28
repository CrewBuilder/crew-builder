#API Documentation

##GET Endpoints

###'/user/crews?id={USER_ID}'
####Response
{
  leader: [
    {
        "points": 0,
        "achievement": "none",
        "role": "leader",
        "crew": {
          id: 4
          name: '',
          description: '',
          image: ''
        }
    }
  ],
  member: [
    {
        {
        "points": 0,
        "achievement": "none",
        "role": "member",
        "crew": {
          id: 5
          name: '',
          description: '',
          image: ''
        }
    }
  ]
}

###'/user/tasks?id={USER_ID}&crewId={CREW_ID}'
####Response
{
  tasksInProgress: [
    {
      name: STRING,
      description: STRING,
      points: INT,
      limit: INT,
      expiry: DATE,
      crewId: INT
      user_task:
        {
          completed: BOOL,
          verified: BOOL
        }
    }
  ],
  tasksAvailable: [
    {
      name: STRING,
      description: STRING,
      points: INT,
      limit: INT,
      expiry: DATE,
      crewId: INT
    }
  ]
}

###'/crew/tasks?crewId={CREW_ID}'
####Response
[
  {
    name: STRING,
    description: STRING,
    points: INT,
    limit: INT,
    expiry: DATE,
    crewId: INT
  }
]

###'/crews'
###Returns all crews.
####Response
[{
  id: INT
  name: STRING,
  description: STRING,
  image: STRING,
}]

###'/leader/crewmembers'
###Leader gets a list of Users
####Response
//TODO

###'/leader/tasks'
###Leader gets a list of tasks that are 'completed'. Lets Leader know which Users are claiming which Tasks to be completed.
####Response
//

##POST Endpoints

###'/crew'
###Leader starts a new crew, creates new crew, creates corresponding user_crew row
####req.body
{
  name: STRING,
  description: STRING,
  image: STRING,
  userId: INT
}

###'/task'
###Leader adds task to Crew. Only Leader of Crew should be able to do this.
####req.body
{
  name: STRING,
  description: STRING,
  points: INT,
  limit: INT,
  expiry: DATE,
  crewId: INT
}

###'/user/crews'
###Member joins a crew, creates corresponding user_crew row
####req.body
{
  crewId: INT,
  userId: INT
}

###'/user/tasks'
###User adds a task to the user_task join table. Task must be connected to the appropriate Crew.
####req.body
{
  taskId: INT,
  userID: INT
}

##PUT Endpoints
//TODO: Leader verify task endpoint, Member claim complete

##DELETE Endpoints
//TODO: Leader delete task endpoint


