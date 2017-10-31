// Here we will populate a 'card' entry for Each crew in a search results.

import React, { Component } from 'react';
import { Media, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';


export default class SearchCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crew: props.crew
    };
    this.joinHandler = (e) => {
      e.preventDefault();
      this.props.joinCrew(this.state.crew);
    }


    // Expect 'props' to contain 'crew' and 'handleCrewClick' function which sets current crew in main view

  }

  // componentWillMount() {
  //   this.setState({
  //     user: this.props.user,
  //     crew: this.props.crew,
  //   });

  // }

  render() {
    const tooltip = (<Tooltip id="tooltip"><strong>Click here</strong> to join this Crew!</Tooltip>);
    return (
      <Media>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Media.Left align="top">
            <img height={120} width={120} src={this.props.crew.image} onClick={this.joinHandler} />
          </Media.Left>
        </OverlayTrigger>

        <Media.Body>
          <Media.Heading>{this.props.crew.name}</Media.Heading>
          <p>{this.props.crew.description}</p>
        </Media.Body>
      </Media>
    );
  }
}


