// crewView is the container for the following subcomponents: crewSummary, tasksInProgress, tasksAvailable, and crewRewards
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import TasksInProgress from './tasksInProgress.jsx';
import TasksAvailable from './tasksAvailable.jsx';
import {Panel, PanelGroup} from 'react-bootstrap';
// Compares userTasks to crewTasks => sends to tasksInProgress and tasksAvailable respectively

export default class CrewView extends Component {

  constructor(props) {
    super(props);
    // this.getCrewTasks
    // gets tasks from crewId
  }

  render() {
    return (
      <div className="cover-background">
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Crew Summary" eventKey="1">
            <CrewSummary
              userId={this.props.user.id}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks in Progress" eventKey="2">
            <TasksInProgress
              userId={this.props.user.id}
              userTasks={this.props.userTasks}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks Available" eventKey="3">
            <TasksAvailable
              userId={this.props.user.id}
              currentCrewTasks={this.props.currentCrewTasks}
              setCurrentCrew={this.props.setCurrentCrew}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}