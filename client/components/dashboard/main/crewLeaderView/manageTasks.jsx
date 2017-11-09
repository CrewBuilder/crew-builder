import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal, Button, Glyphicon } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';
import { DeleteTask } from '../../../utils/requests.jsx';

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

    this.handleSelect = (task) => {
      this.setState({task: task});
      this.show();
    };

    this.delete = (e) => {
      e.preventDefault();
      DeleteTask(this.state.task.id, (err, done) => {
        if (err) {
          console.log(err);
        } else {
          this.props.getCrewTasks(this.props.currentCrew.crew.id);
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
            <ListGroupItem key={i} onClick={() => this.handleSelect(task)}>
              {task.name}
              <small className="small-list-item-text"> - points: {task.points}</small>
            </ListGroupItem>
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
              getCrewTasks={this.props.getCrewTasks}
            />
          </Modal.Body>
        </Modal>
        <Modal show={this.state.displayModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.task.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Points: {this.state.task.points}</h4>
            <h4>Limit: {this.state.task.limit}</h4>
            <h4>Expires: { moment(this.state.task.expiry).format("MM/DD/YYYY") }</h4>
            <h4>Description</h4>
            <p>{this.state.task.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
