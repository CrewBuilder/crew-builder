// crewLeaderView is the container for the following subcomponents: crewSummary, memberRequests, add/edit tasks
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import {Panel, PanelGroup} from 'react-bootstrap';
import MemberRequests from './memberRequests.jsx';
import ManageTasks from './ManageTasks.jsx';


export default class CrewLeaderView extends Component {

  constructor(props) {
    super(props);
    // Needed props: currentCrewMembers, crewTasks, currentCrew, memberReq

    //
    //
  }

  render() {
    return (
      <div className="cover-background">
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Crew Summary" eventKey="1">
            <CrewSummary
              userId={this.props.user.facebookId}
              currentCrew={this.props.currentCrew}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Member Requests" eventKey="2">
            <MemberRequests

            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Manage Tasks" eventKey="3">
            <ManageTasks
              userId={this.props.user.facebookId}
              userTasks={this.props.userTasks}
            />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}