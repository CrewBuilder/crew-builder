// Here we will populate a 'card' entry for Each crew in a search results.

import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import { JoinACrew } from '../../../utils/requests.jsx';

export default class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      crew: null
    };


    // Expect 'props' to contain 'crew' and 'handleCrewClick' function which sets current crew in main view

  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      crew: this.props.crew,
    });

  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={124} height={124} src={this.props.crew.image} crew={this.state.crew} alt="placeholder thumbnail" onClick={(e, crew) => this.props.joinCrew(e, crew)} />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.crew.name}</Media.Heading>
          <p>{this.props.crew.description}</p>
        </Media.Body>
      </Media>
    );
  }
}


