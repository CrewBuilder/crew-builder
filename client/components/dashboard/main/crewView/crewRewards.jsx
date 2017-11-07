// This component renders a list of rewards to be claimed
import React, { Component } from 'react';
import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';


export default class CrewRewards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedReward: props.currentCrewRewards,
      showModal: false,
      crew: null
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
      let reward = this.state.selectedReward.id;
      //TODO: Do something when they claim a reward
    };
  }

  render() {
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
              <p>{this.state.selectedReward.description}</p>
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
