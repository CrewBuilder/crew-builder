// crewView is the container for the following subcomponents: crewSummary, tasksInProgress, tasksAvailable, and crewRewards
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import TasksInProgress from './tasksInProgress.jsx';
import TasksAvailable from './tasksAvailable.jsx';


export default class CrewView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CrewSummary />
        <TasksInProgress />
        <TasksAvailable />
        <p>Crew view COMPONENT</p>
      </div>
    )
  }
}