import React, { Component } from 'react';
import { Media, Image } from 'react-bootstrap';

export default class crewLeaderSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Media>
          <Media.Left>
            <Image src={this.props.currentCrew.image} alt='Image'/>
          </Media.Left>
          <Media.Body>
            <Media.Heading>
            </Media.Heading>
          </Media.Body>
        </Media>
      </div>
    )
  }
}