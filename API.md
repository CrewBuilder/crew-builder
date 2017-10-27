#API Documentation

##GET Endpoints

###'/user/crews?id={USER_ID}'
####Response
{
  leader: [
    {
        "id": 2,
        "points": 0,
        "achievement": "none",
        "role": "member",
        "createdAt": "2017-10-27T03:15:45.179Z",
        "updatedAt": "2017-10-27T03:15:45.179Z",
        "crew_id": 2,
        "user_id": 1,
        "crew": {crewData}
    }
  ],
  member: [
    {
        "id": 2,
        "points": 0,
        "achievement": "none",
        "role": "member",
        "createdAt": "2017-10-27T03:15:45.179Z",
        "updatedAt": "2017-10-27T03:15:45.179Z",
        "crew_id": 2,
        "user_id": 1,
        "crew: {crewData}"
    }]
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
####Response
[{
  id: INT
  name: STRING,
  description: STRING,
  image: STRING,
}]


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

###'/user/crews'
###Member joins a crew, creates corresponding user_crew row
####req.body
{
  crewId: INT,
  userId: INT
}

###'/user/tasks'
###User adds a task to the user_task join table
####req.body
{
  taskId: INT,
  userID: INT
}

##PUT Endpoints
//TODO: Leader verify task endpoint, Member claim complete

##DELETE Endpoints
//TODO: Leader delete task endpoint


