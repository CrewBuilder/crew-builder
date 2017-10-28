import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class ManageTasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.userTasks, 'props for ManageTasks')
    return (
      <h1>Hello</h1>
    )
  }
}