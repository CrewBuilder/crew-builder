import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

export default class MemberRequests extends Component {
  constructor(props) {
    super(props);

    // need to get member requests data throgh props
    this.selectTaskCompleted = (task, confirm) => {
      console.log('confirmTaskCompleted');
      if (confirm) {
        this.props.handleMemberRequestVerification(task.id, confirm);
      } else {
        this.props.handleMemberRequestVerification(task.id);
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
              <div className="member-request-text">{task.name}</div>
            </ListGroupItem>
          )) }
        </ListGroup>
      </div>
    );
  }
}


