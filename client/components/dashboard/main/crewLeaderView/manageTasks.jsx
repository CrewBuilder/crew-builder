import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      displayModal: false,
      newTask: ''
    };

    this.open = () => {
      this.setState({
        showModal: true
      })
    }

    this.show = () => {
      this.setState({
        displayModal: true
      })
    }

    this.close = () => {
      this.setState({
        showModal: false,
        displayModal: false
      })
    }

    this.func = () => {
      if (this.state.newTask.length !== 0)
        this.props.userTasks.push({name: this.state.newTask})
      // TODO:
      // should update the newly added in database
    }

    this.handleSelect = (task) => {
      console.log(task, 'task')
      this.show()
    }
  }

  render() {
    console.log('line 51 in ManageTasks', this.props)
    return (
      <div>
        <ListGroup>
          {this.props.currentCrewTasks.map((task, i) => (
            <ListGroupItem key={i} onClick={() => this.handleSelect(task.name)}>{task.name}</ListGroupItem>
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
            Hello!
          </Modal.Header>
        </Modal>

      </div>
    )
  }
}