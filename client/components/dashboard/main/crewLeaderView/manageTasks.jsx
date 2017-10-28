import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.userTasks, 'props for ManageTasks')
    return (
      <div>
        <ListGroup>
          {this.props.userTasks.map((task, i) => (
            <h1 key={i}>Hello</h1>
          )) }
        </ListGroup>
      </div>
    )
  }
}