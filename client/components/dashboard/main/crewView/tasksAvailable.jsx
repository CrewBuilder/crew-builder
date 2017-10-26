// This component renders a list of tasks that the user has not undertaken yet
import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

export default class TasksAvailable extends Component {

  constructor(props) {
    super(props);
    // will need to include task id in order to make modal work properly
    this.state = {
      selectedTask: ''
    };

    this.tasks = this.props.availableTasks;

    this.handleSelectTask = (task) => {
      this.setState({selectedTask: task.name});
      console.log('Available task selected: ', task.name);
    };
  }

  render() {
    return (
      <div>
        <Accordion>
          {this.tasks.map((task, i) => <Panel header={task.name} onSelect={() => this.handleSelectTask(task)} eventKey={i} key={i}><p>{task.description}</p></Panel>)}
        </Accordion>
      </div>
    );
  }
}