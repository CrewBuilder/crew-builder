// crewView is the container for the following subcomponents: crewSummary, tasksInProgress, tasksAvailable, and crewRewards
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import TasksInProgress from './tasksInProgress.jsx';
import TasksAvailable from './tasksAvailable.jsx';
import {Panel, PanelGroup} from 'react-bootstrap';
// Compares userTasks to crewTasks => sends to tasksInProgress and tasksAvailable respectively


// Example data
const crewData = {
  "name": 'Strings Attached',
  "decription": 'Our vision is to fuse jazz and classical flavors with the contemporary singer/songwriter genre. From the classical tradition we borrowed the precision of composition and arranging. From jazz we brought the performance ethic. The ability to abandon the score and make choices spontaneously. And then there\'s that irresistable sense of"swing" - the thing that gets people dancing.',
  "image": 'http://www.celebratewithstringsattached.com/western-swing.html'
};

const userIdData = '1';

const tasksInProgress = [{
  "name": "Instagram Testimonial",
  "description": "Post a testimonial video to instgram with the hashtag #StringsAttached.",
  "points": 50,
  "expiry": "2017-09-14T09:32:33Z",
  "completed": false,
  "verified": false
}, {
  "name": "Volunteer at Strings on Grass",
  "description": "Arrive 1 hr prior to show time and/or stay 1 hr after show time to help set up/break down",
  "points": 300,
  "expiry": "2017-06-01T01:07:43Z",
  "completed": true,
  "verified": false
}, {
  "name": "5 Facebook Invites",
  "description": "Send Facebook invites to 5 people.",
  "points": 50,
  "expiry": "2017-03-05T22:58:30Z",
  "completed": true,
  "verified": true
}];

const crewTaskAvailableData = [{
  "name": "Post Flyers",
  "description": "Post Strings Attached Flyers at 5 locations. Send photos with geolocation to band email for verification.",
  "points": 200,
  "expiry": "2017-07-21T08:19:26Z",
}, {
  "name": "Tweet about us!",
  "description": "Tweet about Strings Attached 5 days in a row using hashtag #StringsAttached",
  "points": 100,
  "expiry": "2017-06-11T15:21:19Z",
}];


export default class CrewView extends Component {

  constructor(props) {
    super(props);
    // Needed props: currentCrew, user

    // this.getCrewTasks
    // gets tasks from crewId
  }

  render() {
    return (
      <div>
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Crew Summary" eventKey="1">
            <CrewSummary userId={userIdData} crew={crewData} />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks in Progress" eventKey="2">
            <TasksInProgress userId={userIdData} userTasks={tasksInProgress} />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks Available" eventKey="3">
            <TasksAvailable userId={userIdData} availableTasks={crewTaskAvailableData} />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}