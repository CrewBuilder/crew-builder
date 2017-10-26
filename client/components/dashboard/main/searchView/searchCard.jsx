// Here we will populate a 'card' entry for Each crew in a search results.

import React, { Component } from 'react';

import { Media } from 'react-bootstrap';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'crew' and 'handleCrewClick' function which sets current crew in main view
  }

  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={124} height={124} src={this.props.crew.image} alt="placeholder thumbnail" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.crew.name}</Media.Heading>
          <p>{this.props.crew.description}</p>
        </Media.Body>
      </Media>
    )
  }
}


// <div className="crew-card">
//   <div className="crew-name">
//     {this.props.crew.name}
//   </div>
//   <div className="crew-image">
//     <img src={this.props.crew.image} />
//   </div>
//   <div className="crew-description">
//     {this.props.crew.description}
//   </div>
// </div>

