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
          name: 'Les Maurice',
          description: 'Milwaukee rock reggae band',
          image: 'http://www.les-maurice.com/image.jpg',
          id: 31
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
          id: 34
          name: 'Moth Light',
          description: 'Milwaukee synth rock jam band',
          image: 'http://www.moth-light.org/logo.jpg'
        }
    }
  ]
}

###'/user/tasks?id={USER_ID}&crewId={CREW_ID}'
###User GETs task data to be shown in Crew View. NOTE: 'id' field in response refers to Task id.
####Response
{
  tasksInProgress: [
    {
      name: 'Some easy task',
      description: 'Just complete and get points',
      points: 68,
      limit: 48,
      expiry: 2017-12-27T23:58:30.556Z,
      crewId: 4
      id: 35
      user_task:
        {
          completed: false,
          verified: false
        }
      createdAt: 2017-10-27T23:58:30.556Z,
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

###'/crew/rewards?crewId={CREW_ID}'
###Returns all rewards for a crew. Used in CrewView and LeaderCrewView.
####Response
[
  {
    id: 9,
    name: 'T-shirt',
    description: 'Get a "CrewSupporter" t-shirt size S-XL',
    points: 500,
    limit: 10,
    expiry: 2017-12-27T23:58:30.556Z,
    crewId: 3,
    createdAt: '2017-10-27T23:58:30.556Z',
    updatedAt: '2017-10-27T23:58:30.556Z'
  }
]

###'/crew/rewards?crewId={CREW_ID}'
###Returns all tasks for a crew. Used in LeaderCrewView.
####Response
[
  {
    id: 9,
    name: 'Share our status on FB',
    description: 'Like us on FB and share a post to earn 44 points',
    points: 44,
    limit: 100,
    expiry: 2017-12-27T23:58:30.556Z,
    crewId: 1,
    createdAt: '2017-10-27T23:58:30.556Z',
    updatedAt: '2017-10-27T23:58:30.556Z'
  }
]

###'/crews?qs={search string}'
###Returns all crews, query string is optional and can also be set to null to return all crews
####Response
[{
  createdAt: "2017-10-27T23:58:30.538Z",
  id: 1,
  name: "Strings Attached",
  description: "I started Strings Attached as a genre-blurring collaboration with folk
    artists. Our vision was to fuse jazz and classical flavors with the contemporary singer/songwriter
    genre; to dress it up with a little different jewelry. From the classical tradition we borrowed
    the architectural precision of composition and arranging. From jazz we brought the performance
    ethic. The ability to abandon the score and make choices spontaneously, in response to each other
    and the present musical moment. And then there's that irresistable sense of"swing" - the thing
    that gets people dancing.",
  image: "http://www.celebratewithstringsattached.com/uploads/3/5/4/6/3546135/1090860.jpg"
}]

###'/leader/members?crew_id={CREW_ID}'
###Leader gets a list of Users
####Response
[
  {
    achievement: "none",
    createdAt: "2017-10-27T23:58:30.663Z",
    crew_id: 1,
    id: 1,
    points: 0,
    role: "leader",
    updatedAt: "2017-10-27T23:58:30.663Z",
    user_id: 1
    user: {user data}
  }
]

###'/leader/tasks?crew_id={CREW_ID}'
###Leader gets a list of tasks that are completed but still need verification.
#### Example Response from seed data user crewId=4
[
    {
        "taskId": 65,
        "taskName": "Jerde, Bauch and Barrows",
        "taskDescription": "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
        "points": 85,
        "userId": 2,
        "userName": "johndoe",
        "userEmail": "johndoe@johndoe.com",
        "userImg": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
        "userTaskId": 15
    },
    {
        "taskId": 35,
        "taskName": "Kshlerin-Herman",
        "taskDescription": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "points": 68,
        "userId": 2,
        "userName": "johndoe",
        "userEmail": "johndoe@johndoe.com",
        "userImg": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
        "userTaskId": 24
    }
]

###'/crew/rewards?crewId={CREW_ID}'
#### Example Response
[
    {
        "id": 1,
        "name": "T-shirt",
        "description": "Get a t-shirt!",
        "points": 200,
        "limit": 1,
        "expiry": "2018-04-14T09:32:33.000Z",
        "createdAt": "2017-11-07T20:03:43.931Z",
        "updatedAt": "2017-11-07T20:03:43.931Z",
        "crew_id": 3
    },
    {
        "id": 3,
        "name": "Private party.",
        "description": "Attend a private party for the crew.",
        "points": 1000,
        "limit": 10,
        "expiry": "2019-05-14T21:03:51.000Z",
        "createdAt": "2017-11-07T20:03:43.931Z",
        "updatedAt": "2017-11-07T20:03:43.931Z",
        "crew_id": 3
    }
]


##POST Endpoints

###'/crew'
###Leader starts a new crew, creates new crew, creates corresponding user_crew row
####req.body (also response)
{
  name: 'Les Maurice',
  description: 'Milwaukee rock reggae band',
  image: 'http://www.les-maurice.com/image.jpg',
  user_id: 3
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
  crew_id: INT
}

###'/reward'
###Leader adds reward to Crew. Only Leader of Crew should be able to do this.
####req.body
{
  name: STRING,
  description: STRING,
  points: INT,
  limit: INT,
  expiry: DATE,
  crew_id: INT
}

###'/user/crews'
###Member joins a crew, creates corresponding user_crew row
####req.body
{
  crewId: 2,
  userId: 4
}

###'/user/tasks'
###User adds a task to the user_task join table. Task must be connected to the appropriate Crew.
####req.body
{
  taskId: 87,
  userId: 2
}

###'/user/rewards'
####req.body
{
  name: 'T-shirt',
  description: 'get a crew T-shirt',
  points: 300,
  limit: 1,
  expiry: new Date() + 1000,
  crew_id: 4
}

##PUT Endpoints
###'user/tasks'
####All requests should trigger the 'Completed' field of user_task data row to be 'true'. Crew Leader sees all tasks which are 'Completed' but not 'Verified' and will verify them to award points.
####req.body (request will know which action to do based on the state of 'verified')
{
  crew_id: 1,
  points: 100,
  task_id: 40,
  userTaskId: 18,
  user_id: 16,
  verified: false
}

###'/crew?crew_id={crew id}'
####req.body
{
  name: 'new name'
  description: 'new description'
}
etc, include any/all fields that need to be updated. Check to make sure you aren't sending null for any fields

##DELETE Endpoints
### 'user/crews'
TODO: for cleanup this should probably be changed to only accept a query string
####req.body
{
  userId: INT, user id
  crewId: INT, crew id
}
sends back 202 with no data

###/crew?crew_id={crew id}
sends back 202 with no data

###'leader/tasks?taskId={TASK ID}'
sends back 202 with no data

###'crew/rewards?reward_id={reward ID}'
sends back 202 with no data
