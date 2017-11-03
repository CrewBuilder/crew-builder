import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { PostTask } from '../../utils/requests.jsx';
var moment = require('moment');
require('moment/locale/en-ca');

// expect props from manageTasks, related to updation of current tasks
var DateTime = require('react-datetime');
export default class addTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : this.props.name || '',
      description: this.props.description || '',
      Points: this.props.Points || 0,
      Limit: this.props.Limit || 0,
      expiry: '',
    }

    this.show = (e) => {
      var date = moment(e)
      console.log(date._d, 'date');
      console.log(date.format(), 'format')
      this.setState({expiry: date.format()}, function(err, data) {
        if (data) {
          return data
        }
      })
      console.log(this.state.expiry, 'expirtttt')
    }

    this.getValidationState = () => {
      const limitVal = this.state.Limit;
      const pointsVal = this.state.Points;
      if (!isNaN(Number(limitVal)) && !isNaN(Number(pointsVal))) return 'success';
      else if (isNaN(Number(limitVal)) || isNaN(Number(pointsVal))) return 'error';
      return null;
    }


    this.task = (e) => {
      this.task = e.target.value;
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      // var date = moment();
      // console.log(date.format())
      // note: never set state in handleSubmit...
      let points = Number(this.state.Points)
      let limit = Number(this.state.Limit)
      var obj = {
        name: this.state.name,
        description: this.state.description,
        points: points,
        limit: limit,
        expiry: this.state.expiry
      }
      console.log('whole object', obj)
      console.log(typeof obj.Points, 'pointstype')
      PostTask(obj, this.props.currentCrew.crew.id, function(err, data) {
        if (err) {
          console.log('error in posting task');
        }

        if (data) {
          // console.log('posted!!!!!!!!!!!')
          // console.log(props.currentCrewTasks, 'TASK')
          props.getUserTasks(props.userId, props.currentCrew.crew.id)
        }
      })
    }
  }


  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            <FormControl type="number" value={this.state.Points} value={this.state.Points} onChange={(event) => this.setState({Points: event.target.value})}/>
            <ControlLabel>Limit</ControlLabel>
            <FormControl type="number" value={this.state.Limit} value={this.state.Limit} onChange={(event) => this.setState({Limit: event.target.value})} />
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