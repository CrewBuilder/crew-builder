// Here we will populate a 'card' entry for Each crew in a search results.

import React, { Component } from 'react';
import { Media, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';


export default class SearchCard extends Component {

  constructor(props) {
    super(props);

    this.joinHandler = (e) => {
      e.preventDefault();
      this.props.joinCrew(this.props.crew);
    };
    // Expect 'props' to contain 'crew' and 'handleCrewClick' function which sets current crew in main view
  }

  render() {
    const tooltip = (<Tooltip id="tooltip"><strong>Click here</strong> to join this Crew!</Tooltip>);
    return (
      <Media>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Media.Left align="top">
            <img height={120} width={120} src={this.props.crew.image} onClick={this.joinHandler} className="image-shadow" />
          </Media.Left>
        </OverlayTrigger>

        <Media.Body className="search-card-media-body">
          <Media.Heading>{this.props.crew.name}</Media.Heading>
          <p>{this.props.crew.description}</p>
        </Media.Body>
        {(this.props.count + 1 ) % 3 === 0 ?
          null
          : <hr className="hr-break" /> }
      </Media>
    );
  }
}


