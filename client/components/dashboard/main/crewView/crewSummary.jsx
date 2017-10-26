// This component renders a crewSummary card with some information and a picture
import React, { Component } from 'react';
import { Media, Image } from 'react-bootstrap';

export default class CrewSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Media>
          <Media.Left>
            <Image width={150} src={this.props.crew.image} alt='Image'/>
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.crew.name}</Media.Heading>
            <p>{this.props.crew.description}</p>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
            // <p>You have 150 points with this crew!</p>
            // <p>Your achievement level with this crew is GOLD</p>