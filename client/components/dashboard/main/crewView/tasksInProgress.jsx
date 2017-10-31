// This component renders all the tasks a user has claimed for their crew
import React, { Component } from 'react';
import {Modal, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
export default class TasksInProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focusTask: props.userTasks,
      showModal: false
    };

    this.openModal = (e, taskTarget) => {
      this.setState({ focusTask: taskTarget });
      this.setState({ showModal: true });
    };

    this.closeModal = () => {
      this.setState({ showModal: false });
    };

    this.confirmTask = () => {
      // TODO
    };

  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.userTasks.map((task, i) => <ListGroupItem onClick={(e, task) => this.handleSelectTask(task)} key={i}>{task.name}</ListGroupItem>)}
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.focusTask.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.focusTask.points}</h4>
            <div>
              <div>
                <h4>Expires: {this.state.focusTask.expiry}</h4>
              </div>
              <h4>Completed? {this.state.focusTask.completed}</h4>
              <Button onClick={this.confirmTask} >Click to request completion</Button>
            </div>
            <div>
              <h4>Verified? {this.state.focusTask.verified}</h4>
            </div>
            <h4>Description</h4>
            <p>{this.state.focusTask.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}