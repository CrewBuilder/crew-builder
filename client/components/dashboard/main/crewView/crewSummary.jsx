// This component renders a crewSummary card with some information and a picture
import React, { Component } from 'react';
import { Media, Image, Button, Alert, Badge } from 'react-bootstrap';
import { DeleteUserCrew } from '../../../utils/requests.jsx';

export default class CrewSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLeave: false
    };
    this.leaveCrewHandler = () => {
      this.setState({showLeave: true});
    };
    this.handleAlertDismiss = () => {
      this.setState({showLeave: false});
    };

    this.handleConfirmLeave = () => {
      let userId = this.props.userId;
      let crew_id = this.props.currentCrew.crew.id;
      DeleteUserCrew(userId, crew_id, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Data', data);
        }
      });
      this.setState({showLeave: false});
    };
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
            <p><Badge>{this.props.currentCrew.role}</Badge><em> You have {this.props.currentCrew.points} points with this crew!</em></p>
            <p>{this.props.currentCrew.crew.description}</p>
            <p><strong>{achievementLevel}</strong></p>
          </Media.Body>
          <Media.Right>

            <div>
              {(this.state.showLeave === true) ? <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                <h4>Are you sure you want to leave?</h4>
                <p>Once you leave a Crew you will forfeit any points you have earned.</p>
                <p>
                  <Button bsStyle="danger" onClick={this.handleConfirmLeave} href="/">Yes, I know I will lose my points</Button>
                  <span> or </span>
                  <Button onClick={this.handleAlertDismiss}>Nevermind</Button>
                </p>
              </Alert> : <Button onClick={this.leaveCrewHandler} > Leave </Button> }
            </div>
          </Media.Right>
        </Media>
      </div>
    );
  }
}

