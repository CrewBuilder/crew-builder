// crewView is the container for the following subcomponents: crewSummary, tasksInProgress, tasksAvailable, and crewRewards
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import TasksInProgress from './tasksInProgress.jsx';
import TasksAvailable from './tasksAvailable.jsx';
import CrewRewards from './crewRewards.jsx';

import { Panel, PanelGroup, ResponsiveEmbed } from 'react-bootstrap';
// Compares userTasks to crewTasks => sends to tasksInProgress and tasksAvailable respectively

import Social from './social.jsx';

export default class CrewView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cover-background clearfix container-fluid">
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Crew Summary" eventKey="1">
            <CrewSummary
              userId={this.props.user.id}
              currentCrew={this.props.currentCrew}
              getCurrentCrews={this.props.getCurrentCrews}
            />
            <Social
              currentCrew={this.props.currentCrew}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks in Progress" eventKey="2">
            <TasksInProgress
              userId={this.props.user.id}
              userTasks={this.props.userTasks}
              getCurrentCrews={this.props.getCurrentCrews}
              getUserTasks={this.props.getUserTasks}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Tasks Available" eventKey="3">
            <TasksAvailable
              userId={this.props.user.id}
              getUserTasks={this.props.getUserTasks}
              currentCrewTasks={this.props.currentCrewTasks}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Rewards Available" eventKey="4">
            <CrewRewards
              userId={this.props.user.id}
              currentCrewRewards={this.props.currentCrewRewards}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}