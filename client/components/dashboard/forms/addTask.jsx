import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
export default class addTask extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.task)
  }

  task(e) {
    this.task = e.target.value;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <FormControl type="text" placeholder="Add a new Task" onChange={this.task.bind(this)}/>
            <Button type="submit">
               Add a task
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}