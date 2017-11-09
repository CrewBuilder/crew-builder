// This component renders a list of rewards to be claimed
import React, { Component } from 'react';
import { Alert, Modal, ListGroup, ListGroupItem, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { ClaimReward } from '../../../utils/requests.jsx';


export default class CrewRewards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedReward: props.currentCrewRewards,
      showModal: false,
      crew: null,
      email: '',
      alertVisible: false,
      successVisible: false
    };

    this.handleSelectReward = (reward) => {
      this.setState({selectedReward: reward});
      this.setState({showModal: true});
      this.setState({crew: this.props.currentCrew});
    };

    this.closeModal = () => {
      this.setState({showModal: false});
    };

    this.claimReward = () => {
      this.setState({showModal: false});
      let reward = this.state.selectedReward;
      let email = this.state.email;
      let availablePoints = this.props.points;
      let points = this.state.selectedReward.points;
      let user_id = this.props.userId;
      let crew_id = this.state.crew.crew.id;
      let crew_name = this.state.crew.crew.name;
      let limit = this.state.selectedReward.limit;
      if (availablePoints >= points && limit > 0) {
        ClaimReward(reward, email, user_id, crew_id, crew_name, (err, res) => {
          if (res) {
            this.setState({
              successVisible: true
            });
            this.props.spendPoints(points);
          }
        });
      } else {
        this.setState({
          alertVisible: true,
        });
      }
    };

    this.handleAlertDismiss = () => {
      this.props.getCurrentCrews(this.props.userId);
      this.setState({
        alertVisible: false,
        successVisible: false,
      });
    };
  }

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>You need more points!</h4>
          <p>Complete tasks to earn enough points for this sweet reward</p>
          <p>
            <Button onClick={this.handleAlertDismiss}>Ok</Button>
          </p>
        </Alert>
      );
    } else if (this.state.successVisible) {
      return (
        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
          <h4>You earned {this.state.selectedReward.name}!</h4>
          <p>Check your email for instructions to redeem your reward!</p>
          <p>
            <Button onClick={this.handleAlertDismiss}>Ok</Button>
          </p>
        </Alert>
      );
    } else {
      return (
        <div>
          <div>
            <ListGroup>
              {this.props.currentCrewRewards.map((reward, i) => <ListGroupItem onClick={() => this.handleSelectReward(reward)} key={i}>{reward.name}</ListGroupItem>)}
            </ListGroup>
          </div>
          <div>
            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.selectedReward.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Points: {this.state.selectedReward.points}</h4>
                <h4>Remaining: {this.state.selectedReward.limit}</h4>
                <p>{this.state.selectedReward.description}</p>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <ControlLabel>Email: </ControlLabel>
                    <FormControl type="text" placeholder="Your email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.claimReward}>Claim this reward</Button>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    }
  }
}
