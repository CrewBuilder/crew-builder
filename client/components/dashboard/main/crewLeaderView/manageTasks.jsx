import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';
import { DeleteTask, GetLeaderTasks } from '../../../utils/requests.jsx';

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      displayModal: false,
      newTask: '',
      task: {}
    };

    this.open = () => {
      this.setState({
        showModal: true
      });
    };

    this.show = () => {
      this.setState({
        displayModal: true
      });
    };

    this.close = () => {
      this.setState({
        showModal: false,
        displayModal: false
      });
    };

    this.func = () => {
      if (this.state.newTask.length !== 0)
        this.props.userTasks.push({name: this.state.newTask});
      // TODO:
      // should update the newly added in database
    };

    this.handleSelect = (task) => {
      this.setState({task: task});
      this.show();
    };

    this.delete = (e) => {
      e.preventDefault();
      DeleteTask(this.state.task.id, function(err, done) {
        if (err) {
          console.log('problem in deleting');
        }
        if (done) {
          props.getUserTasks(props.userId, props.currentCrew.crew.id);
        }
      });
      this.close();
    }
  }

  render() {
    // console.log('line 51 in ManageTasks', this.props)
    return (
      <div>
        <ListGroup>
          {this.props.currentCrewTasks.map((task, i) => (
            <ListGroupItem key={i} onClick={() => this.handleSelect(task)}>{task.name}</ListGroupItem>
          )) }
          <ListGroupItem onClick={this.open}>+ addTask</ListGroupItem>
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            Add/Update a Task
          </Modal.Header>
          <Modal.Body>
            <AddTask {...this.props}/>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.displayModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.task.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.task.points}</h4>
            <h4>Limit: {this.state.task.limit}</h4>
            <h4>Expires: {this.state.task.expiry}</h4>
            <h4>Description</h4>
            <p>{this.state.task.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete}>Delete</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}
