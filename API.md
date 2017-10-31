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

###'/crew/tasks?crewId={CREW_ID}'
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


##POST Endpoints

###'/crew'
###Leader starts a new crew, creates new crew, creates corresponding user_crew row
####req.body (also response)
{
  name: 'Les Maurice',
  description: 'Milwaukee rock reggae band',
  image: 'http://www.les-maurice.com/image.jpg',
  id: 31,
  createdAt: "2017-10-28T03:13:05.289Z",
  updatedAt: "2017-10-28T03:13:05.289Z"
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
  crewId: 2,
  userId: 4
}

###'/user/tasks'
###User adds a task to the user_task join table. Task must be connected to the appropriate Crew.
####req.body
{
  taskId: 87,
  userID: 2
}

##PUT Endpoints
//TODO: Leader verify task endpoint, Member claim complete
###'user/tasks'
####req.body (request will know which action to do based on fields included)
{
  userTaskId: INT, unique identifier for the user_task selected
  verified: BOOL, optional, only include for leader verification
}

##DELETE Endpoints
//TODO: Leader delete task endpoint


