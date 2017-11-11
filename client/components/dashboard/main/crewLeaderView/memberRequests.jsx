import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

export default class MemberRequests extends Component {
  constructor(props) {
    super(props);

    // need to get member requests data through props
    this.selectTaskCompleted = (task, confirm) => {
      let task_id = task.task_id;
      let crew_id = this.props.currentCrew.crew.id;
      let points = task.points;
      let user_id = task.user_id;
      if (confirm) {
        console.log('task', task);
        this.props.handleMemberRequestVerification(task.user_task_id, confirm, user_id, task_id, points, crew_id);
      } else {
        // TODO: Revoke 'completion' of a task
        // this.props.handleMemberRequestVerification(task.id, false, );
      }
    };
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.currentTasksToConfirm.map((task, i) => (
            <ListGroupItem
              key={i}>
              <div className="member-request-confirm-buttons">
                <ButtonGroup>
                  <Button bsStyle="success" onClick={() => this.selectTaskCompleted(task, 'true')}><Glyphicon glyph="ok" /> Confirm</Button>
                  <Button bsStyle="danger" onClick={() => this.selectTaskCompleted(task)}><Glyphicon glyph="remove" /> Reject</Button>
                </ButtonGroup>
              </div>
              <div className="member-request-text">CrewMember: {task.user_name} requested completion of {task.task_name}</div>
            </ListGroupItem>
          )) }
        </ListGroup>
      </div>
    );
  }
}


