import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
var moment = require('moment');
require('moment/locale/en-ca');

var DateTime = require('react-datetime');
export default class addTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      description: '',
      Points: '',
      Limit: '',
      expiry: '',
      createdAt: '',
      updatedAt: ''
    }

    this.show = (e) => {
      var date = moment(e)
      console.log(date._d, 'date');
      console.log(date.format(), 'format')
      this.setState({expiry: date.format()})
      console.log(this.state.expiry, 'expirtttt')
    }

    this.task = this.task.bind(this);

    this.getValidationState = () => {
      const limitVal = this.state.Limit;
      const pointsVal = this.state.Points;
      if (!isNaN(Number(limitVal)) && !isNaN(Number(pointsVal))) return 'success';
      else if (isNaN(Number(limitVal)) || isNaN(Number(pointsVal))) return 'error';
      return null;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.taskInput);
    var obj = {
      updatedAt: moment().format(),
      expiry: ''
    }
    var date = moment();
    console.log(date.format())
  }

  task(e) {
    this.task = e.target.value;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <ControlLabel>Name of the task</ControlLabel>
            <FormControl type="text" placeholder="Add a new Task" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="description" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}/>
          </FormGroup>
          <FormGroup validationState={this.getValidationState()}>
            <ControlLabel>Points</ControlLabel>
            <FormControl type="text" value={this.state.Points} value={this.state.Points} onChange={(event) => this.setState({Points: event.target.value})}/>
            <ControlLabel>Limit</ControlLabel>
            <FormControl type="text" value={this.state.Limit} value={this.state.Limit} onChange={(event) => this.setState({Limit: event.target.value})} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Expiry Date</ControlLabel>
            <DateTime utc={true} onChange={(e) => this.show(e)}/>
          </FormGroup>
            <Button type="submit">
               Add a task
            </Button>
        </form>
      </div>
    )
  }
}