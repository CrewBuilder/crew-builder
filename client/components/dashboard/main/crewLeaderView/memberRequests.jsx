import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class MemberRequests extends Component {
  constructor(props) {
    super(props);

    // need to get member requests data throgh props
  }

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>Member request 1</ListGroupItem>
          <ListGroupItem>Member request 2</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}