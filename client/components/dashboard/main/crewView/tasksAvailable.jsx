// This component renders a list of tasks that the user has not undertaken yet
import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { ClaimATask } from '../../../utils/requests.jsx';


export default class TasksAvailable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTask: props.currentCrewTasks,
      showModal: false,
      crew: null
    };

    //this.tasks = this.props.currentCrewTasks;

    this.handleSelectTask = (task) => {
      this.setState({selectedTask: task});
      this.setState({showModal: true});
      this.setState({crew: this.props.currentCrew});
    };

    this.closeModal = () => {
      this.setState({showModal: false});
    };

    this.claimTask = () => {
      this.setState({showModal: false});
      let userId = props.userId;
      let task = this.state.selectedTask.id;
      ClaimATask(userId, task, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Data', data);
          this.props.getUserTasks(userId, this.state.selectedTask.crew_id);
        }
      });
    };
  }

  render() {
    return (
      <div>
        <div>
          <ListGroup>
            {this.props.currentCrewTasks.map((task, i) => <ListGroupItem onClick={() => this.handleSelectTask(task)} key={i}>{task.name}</ListGroupItem>)}
          </ListGroup>
        </div>
        <div>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedTask.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Points: {this.state.selectedTask.points}</h4>
              <p>{this.state.selectedTask.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.claimTask}>Claim this task</Button>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}


