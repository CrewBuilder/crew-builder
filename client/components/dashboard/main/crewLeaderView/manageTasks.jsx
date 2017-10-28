import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.open = () => {
      this.setState({
        showModal: true
      })
    }

    this.close = () => {
      this.setState({
        showModal: false
      })
    }
  }

  render() {
    console.log(this.props.userTasks, 'props for ManageTasks')
    return (
      <div>
        <ListGroup>
          {this.props.userTasks.map((task, i) => (
            <ListGroupItem key={i}>{task.name}</ListGroupItem>
          )) }
          <ListGroupItem onClick={this.open}>+ addTask</ListGroupItem>
        </ListGroup>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            Add a new Task
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
        </Modal>
      </div>
    )
  }
}