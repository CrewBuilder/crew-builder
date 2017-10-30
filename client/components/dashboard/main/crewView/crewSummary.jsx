// This component renders a crewSummary card with some information and a picture
import React, { Component } from 'react';
import { Media, Image } from 'react-bootstrap';

export default class CrewSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const achievementLevel = this.props.currentCrew.achievement !== "none" ?
      `Your achievement level with this crew is ${this.props.currentCrew.achievement}` :
      `Complete some tasks to help the cause and gain achievements!`;

    return (
      <div>
        <Media>
          <Media.Left>
            <Image src={this.props.currentCrew.crew.image} alt='Image'/>
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.currentCrew.crew.name}</Media.Heading>
            <h5> <strong>{this.props.currentCrew.role}</strong> </h5>
            <p>You have {this.props.currentCrew.points} points with this crew!</p>
            <p>{achievementLevel}</p>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
