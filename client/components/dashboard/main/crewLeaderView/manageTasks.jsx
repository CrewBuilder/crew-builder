import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal, Button, Glyphicon } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';
import { DeleteTask, GetLeaderTasks } from '../../../utils/requests.jsx';

import moment from 'moment';
import 'moment/locale/en-ca';

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
      if (this.state.newTask.length !== 0) {
        this.props.userTasks.push({name: this.state.newTask});
      }
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
          props.getUserTasks(props.user_id, props.currentCrew.crew.id);
        }
      });
      this.close();
    };
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.currentCrewTasks.map((task, i) => (
            <ListGroupItem key={i} onClick={() => this.handleSelect(task)}>{task.task_name}</ListGroupItem>
          )) }
          <ListGroupItem onClick={this.open}><Glyphicon glyph="plus" /> Add Task</ListGroupItem>
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            Add Task
          </Modal.Header>
          <Modal.Body>
            <AddTask
              {...this.props}
              closeModal={this.close}
            />
          </Modal.Body>
        </Modal>
        <Modal show={this.state.displayModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.task.task_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.task.points}</h4>
            <h4>Limit: {this.state.task.limit}</h4>
            <h4>Expires: { moment(this.state.task.expiry).format("MM/DD/YYYY") }</h4>
            <h4>Description</h4>
            <p>{this.state.task.task_description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete}>Delete</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
