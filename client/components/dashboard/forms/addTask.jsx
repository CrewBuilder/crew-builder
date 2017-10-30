import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
export default class AddTask extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    //console.log(this.input.value)
    this.props.taskData(this.input.value)
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <FormControl type="text" placeholder="Add a new Task" inputRef={ref => this.input = ref}/><br/>
            <FormControl componentClass="textarea" placeholder="description" inputRef={ref => this.description = ref}/><br/>
            <FormControl componentClass="select" placeholder="select">
              <option value="one">1</option>
              <option value="two">2</option>
            </FormControl>
            <Button type="submit">
               Add a task
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}