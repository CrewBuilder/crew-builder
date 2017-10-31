import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import AddTask from './../../forms/addTask.jsx';

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newTask: ''
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

    this.addTaskData = (data) => {
      console.log(data)
      this.setState({
        newTask: data
      }, function(err, data) {
        if (err)
          console.log(err);
        else
          this.func();
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
      this.open()
    }
  }

  render() {

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
            <AddTask taskData={this.addTaskData} updateData={this.handleSelect}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}