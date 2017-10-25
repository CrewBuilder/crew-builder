// crewView is the container for the following subcomponents: crewSummary, tasksInProgress, tasksAvailable, and crewRewards
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import TasksInProgress from './tasksInProgress.jsx';
import TasksAvailable from './tasksAvailable.jsx';
import {Panel, PanelGroup} from 'react-bootstrap'
// Compares userTasks to crewTasks => sends to tasksInProgress and tasksAvailable respectively


// Example data
const crewData = {
  "name": 'Strings Attached',
  "decription": 'I started Strings Attached as a genre-blurring collaboration with folk artists. Our vision was to fuse jazz and classical flavors with the contemporary singer/songwriter genre; to dress it up with a little different jewelry. From the classical tradition we borrowed the architectural precision of composition and arranging. From jazz we brought the performance ethic. The ability to abandon the score and make choices spontaneously, in response to each other and the present musical moment. And then there\'s that irresistable sense of"swing" - the thing that gets people dancing.',
  "image": 'http://www.celebratewithstringsattached.com/western-swing.html'
};

const userIdData = '1';

const tasksInProgress = [{
  "name": "Bergstrom, Blanda and Hamill",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  "points": 86,
  "expiry": "2017-09-14T09:32:33Z",
  "completed": false,
  "verified": false
}, {
  "name": "Zemlak, Koepp and Schoen",
  "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "points": 13,
  "expiry": "2017-06-01T01:07:43Z",
  "completed": true,
  "verified": false
}, {
  "name": "Waters and Sons",
  "description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  "points": 42,
  "expiry": "2017-03-05T22:58:30Z",
  "completed": true,
  "verified": true
}];

const crewTaskAvailableData = [{
  "name": "Jacobi-Schiller",
  "description": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "points": 81,
  "expiry": "2017-07-21T08:19:26Z",
}, {
  "name": "Heller Inc",
  "description": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
  "points": 13,
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
    )
  }
}