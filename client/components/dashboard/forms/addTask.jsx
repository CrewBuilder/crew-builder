import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { PostTask } from '../../utils/requests.jsx';

import moment from 'moment';
import 'moment/locale/en-ca';
import DateTime from 'react-datetime';
// expect props from manageTasks, related to updation of current tasks

var yesterday = moment().subtract(1, 'day');

var valid = (current) => {
  return current.isAfter(yesterday);
};

export default class addTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : this.props.name || '',
      description: this.props.description || '',
      points: this.props.points || 0,
      limit: this.props.limit || 0,
      expiry: '',
    };

    this.show = (e) => {
      var date = moment(e);
      this.setState({
        expiry: date.format()
      });
    };

    this.getValidationState = () => {
      const limitVal = this.state.limit;
      const pointsVal = this.state.points;
      if (!isNaN(Number(limitVal)) && !isNaN(Number(pointsVal))) return 'success';
      else if (isNaN(Number(limitVal)) || isNaN(Number(pointsVal))) return 'error';
      return null;
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.closeModal();
      // note: never set state in handleSubmit...
      let points = Number(this.state.points);
      let limit = Number(this.state.limit);
      var obj = {
        name: this.state.name,
        description: this.state.description,
        points: points,
        limit: limit,
        expiry: this.state.expiry
      };

      PostTask(obj, this.props.currentCrew.crew.id, (err, data)=> {
        if (err) {
          console.log(err);
        } else {
          this.props.getCrewTasks(this.props.currentCrew.crew.id);
        }
      });
    };
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="name of task" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} required/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="tell your members what this task requires" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} required/>
          </FormGroup>
          <FormGroup validationState={this.getValidationState()}>
            <ControlLabel>Points</ControlLabel>
            <FormControl type="number" value={this.state.points} value={this.state.points} onChange={(event) => this.setState({points: event.target.value})} required/>
            <ControlLabel>Limit</ControlLabel>
            <FormControl type="number" value={this.state.limit} value={this.state.limit} onChange={(event) => this.setState({limit: event.target.value})} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Expiry Date</ControlLabel>
            <DateTime utc={true} onChange={(e) => this.show(e)} isValidDate={valid}/>
          </FormGroup>
          <Button type="submit">
             Add a task
          </Button>
        </form>
      </div>
    );
  }
}
