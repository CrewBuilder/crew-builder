import React, { Component } from 'react';
import {Jumbotron, Button, Carousel, Modal} from 'react-bootstrap';

export default class Instructions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.open = () => {
      this.setState({
        showModal: true
      });
    };

    this.close = () => {
      this.setState({
        showModal: false
      });
    };
  }

  render() {
    return (
      <div className="vertical-center">
        <Jumbotron className="landing-container instructions-container">
          <img className="instructions-img-title" src="http://res.cloudinary.com/sarikonda/image/upload/crewbuilder.png"/>
          <Button bsStyle="success" onClick={this.open}> Click this button to get started</Button>
        </Jumbotron>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              Welcome to Crew Builder!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>

              <Carousel.Item>
                <img src="http://res.cloudinary.com/sarikonda/image/upload/browse.png"/>
                <Carousel.Caption>
                  <h3>Browse</h3>
                  <p className="instructions-text">Hit the browse button or search for crew to join!</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src="http://res.cloudinary.com/sarikonda/image/upload/crewMemberView.png"/>
                <Carousel.Caption>
                  <h3>Crew Member View</h3>
                  <p className="instructions-text">Once the tasks are done, Claim them and get Cool Rewards!</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src="http://res.cloudinary.com/sarikonda/image/upload/createCrew.png"/>
                <Carousel.Caption>
                  <h3>Create Crew</h3>
                  <p className="instructions-text">Enter the details and lead a Crew!</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src="http://res.cloudinary.com/sarikonda/image/upload/Leader%20View.png"/>
                <Carousel.Caption>
                  <h3>Crew Leader View</h3>
                  <p className="instructions-text">Manage the Crew, Confirm or Reject Member Tasks</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src="http://res.cloudinary.com/sarikonda/image/upload/addtask.png"/>
                <Carousel.Caption>
                  <h3>Manage Tasks</h3>
                  <p className="instructions-text">Create, delete Tasks and Rewards</p>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
