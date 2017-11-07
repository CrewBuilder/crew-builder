// This component renders all the tasks a user has claimed for their crew
import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';
import { UpdateTask } from '../../../utils/requests.jsx';
const moment = require('moment');

export default class TasksInProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focusTask: props.userTasks,
      focusUserTask: props.userTasks,
      showModal: false,
      focusTaskExpiry: props.userTasks
    };

    this.openModal = (taskTarget) => {
      let expiry = moment(this.state.focusTask.expiry).format("MM/DD/YYYY");
      this.setState({ focusTask: taskTarget });
      this.setState({ focusTaskExpiry: expiry });
      this.setState({ focusUserTask: taskTarget.user_task });
      this.setState({ showModal: true });
    };

    this.closeModal = () => {
      this.setState({ showModal: false });
    };

    this.confirmTask = (e) => {
      e.preventDefault();
      let taskId = this.state.focusUserTask.id;
      UpdateTask(taskId, null, (err, data) => {
        this.props.getUserTasks(this.props.userId, this.state.focusTask.crew_id);
      });
      this.closeModal();
    };



  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.userTasks.map((task, i) => {
            return (<ListGroupItem onClick={() => this.openModal(task)} key={i}>{task.name}
              {(task.user_task.completed === true && task.user_task.verified === false) ? <Label bsStyle="warning" className="task-status-labels">Waiting approval...</Label> : ''}
              {(task.user_task.completed === true && task.user_task.verified === true) ? <Label bsStyle="success" className="task-status-labels">Task Completed</Label> : ''}
              </ListGroupItem>);
          })}
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.focusTask.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.focusTask.points}</h4>
            <div>
              <div>
                <h4>Expires: {this.state.focusTaskExpiry}</h4>
              </div>
              <h4>Completed? {(this.state.focusUserTask.completed === true) ? <span>Yes</span> :
                <span>No <Button onClick={(e) => this.confirmTask(e)} >Click to request completion</Button></span>
              }
              </h4>
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