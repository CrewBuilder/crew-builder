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
              {this.props.currentCrew.name}
            </Media.Heading>
            <p>list members</p>
            <p>Edit crew profile</p>
          </Media.Body>
        </Media>
      </div>
    )
  }
}

// when you click on list members it should pop over a model showing all the current members

// when you click on a edit profile it should popover a model, which is actually our createcrew form to update and change