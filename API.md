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
      task_name: 'Some easy task',
      task_description: 'Just complete and get points',
      points: 68,
      limit: 48,
      expiry: 2017-12-27T23:58:30.556Z,
      crew_id: 4
      id: 35
      User_Tasks:
        {
          completed: false,
          verified: false
        }
      createdAt: 2017-10-27T23:58:30.556Z,
    }
  ],
  tasksAvailable: [
    {
      task_name: STRING,
      task_description: STRING,
      points: INT,
      limit: INT,
      expiry: DATE,
      crew_id: INT
    }
  ]
}

###'/crew/tasks?crewId={CREW_ID}'
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
    task_name: 'Share our status on FB',
    task_description: 'Like us on FB and share a post to earn 44 points',
    points: 44,
    limit: 100,
    expiry: 2017-12-27T23:58:30.556Z,
    crew_id: 1,
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

###'/leader/members?crewId={CREW_ID}'
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
  }
]

###'/leader/tasks?crewId={CREW_ID}'
###Leader gets a list of tasks that are completed but still need verification.
#### Example Response from seed data user crewId=4
    {
        "task_id": 65,
        "task_name": "Jerde, Bauch and Barrows",
        "task_description": "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
        "points": 85,
        "user_id": 2,
        "user_name": "johndoe",
        "user_email": "johndoe@johndoe.com",
        "user_image": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
    }
]


##POST Endpoints

###'/crew'
###Leader starts a new crew, creates new crew, creates corresponding user_crew row
####req.body (also response)
{
  crew_name: 'Les Maurice',
  crew_description: 'Milwaukee rock reggae band',
  crew_image: 'http://www.les-maurice.com/image.jpg',
  id: 31,
  createdAt: "2017-10-28T03:13:05.289Z",
  updatedAt: "2017-10-28T03:13:05.289Z"
}

###'/task'
###Leader adds task to Crew. Only Leader of Crew should be able to do this.
####req.body
{
  task_name: STRING,
  task_description: STRING,
  points: INT,
  limit: INT,
  expiry: DATE,
  crew_id: INT
<<<<<<< HEAD
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
  crew_id: 2,
  user_id: 4
}

###'/user/tasks'
###User adds a task to the user_task join table. Task must be connected to the appropriate Crew.
####req.body
{
  task_id: 87,
  user_id: 2
}

##PUT Endpoints
###'user/tasks'
####req.body (request will know which action to do based on fields included)
{
  user_id: INT, unique identifier for the user selected
  task_id: INT, task id
  verified: BOOL, optional, only include for leader verification
}

##DELETE Endpoints
### 'user/crews'
TODO: for cleanup this should probably be changed to only accept a query string
####req.body
{
  userId: INT, user id
  crewId: INT, crew id
}
sends back 202 with no data

###'leader/tasks
####req.body
{
  task_id: task id
}
sends back 202 with no data
