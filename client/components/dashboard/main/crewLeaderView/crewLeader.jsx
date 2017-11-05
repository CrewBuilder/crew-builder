// crewLeaderView is the container for the following subcomponents: crewSummary, memberRequests, add/edit tasks
import React, { Component } from 'react';
import CrewSummary from './crewSummary.jsx';
import {Panel, PanelGroup} from 'react-bootstrap';
import MemberRequests from './memberRequests.jsx';
import ManageTasks from './manageTasks.jsx';

import { GetCrewMembers } from '../../../utils/requests.jsx';

export default class CrewLeaderView extends Component {

  constructor(props) {
    super(props);
    // Needed props: currentCrewMembers, crewTasks, currentCrew, memberReq
    this.state = {
      crewMembers: []
    };

    this.getCrewMembers = (crew_id) => {
      GetCrewMembers(crew_id, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        } else {
          console.log(res);
          this.setState({
            crewMembers: res
          });
        }
      });
    };

  }


  render() {

    console.log(this.props);

    return (
      <div className="cover-background">
        <PanelGroup>
          <Panel collapsible defaultExpanded={true} header="Crew Summary" eventKey="1">
            <CrewSummary
              userId={this.props.user.id}
              currentCrew={this.props.currentCrew}
              getCrewMember={this.getCrewMembers}
              crewMembers={this.state.crewMembers}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Member Requests" eventKey="2">
            <MemberRequests
              currentTasksToConfirm={this.props.currentTasksToConfirm}
              handleMemberRequestVerification={this.props.handleMemberRequestVerification}
            />
          </Panel>
          <Panel collapsible defaultExpanded={true} header="Manage Tasks" eventKey="3">
            <ManageTasks
              userId={this.props.user.id}
              currentCrewTasks={this.props.currentCrewTasks}
              currentCrew={this.props.currentCrew}
              getUserTasks={this.props.getUserTasks}
            />
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}