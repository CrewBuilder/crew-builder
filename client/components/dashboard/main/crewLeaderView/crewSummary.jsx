import React, { Component } from 'react';
import { Media, Modal, ButtonGroup, Button, Alert, Image } from 'react-bootstrap';
import { Transformation } from 'cloudinary-react';
import CreateCrew from './../../forms/createCrew.jsx';

import { DeleteLeaderCrew } from '../../../utils/requests.jsx';

export default class crewLeaderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editForm: false,
      checkMembers: false,
      showDeleteCrew: false
    };

    this.open = () => {
      this.setState({
        editForm: true
      });
    };

    this.close = () => {
      this.setState({
        showModal: false,
        editForm: false
      });
    };

    this.checkMembers = () => {
      this.props.getCrewMembers(this.props.currentCrew.crew.id);
      this.setState({
        checkMembers: true,
        showModal: true
      });
    };

    // delete crew modal and functions
    this.deleteCrewHandler = () => {
      this.setState({
        showDeleteCrew: true
      });
    };

    this.handleAlertDismiss = () => {
      this.setState({
        showDeleteCrew: false
      });
    };

    this.handleConfirmDeleteCrew = () => {
      let crew_id = this.props.currentCrew.crew.id;
      DeleteLeaderCrew(crew_id, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          this.props.getCurrentCrews(this.props.userId);
          window.location.reload();
        }
      });

    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showDeleteCrew: false});
  }

  render() {
    if (!this.props.currentCrew) {
      return (
        <div />
      );
    } else {
      return (
        <div>
          <Media>
            <Media.Left>
              <Image src={this.props.currentCrew.crew.image} alt="Image" className="crew-image"/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                {this.props.currentCrew.crew.name}
              </Media.Heading>
              <ButtonGroup>
                <Button onClick={this.checkMembers}>Show Members</Button>
                <Button onClick={this.open}>Edit Crew</Button>
                <Button onClick={this.deleteCrewHandler} bsStyle="danger"> Delete Crew </Button>
              </ButtonGroup>
              <Media.Heading>
                <small>Description</small>
              </Media.Heading>
              {this.props.currentCrew.crew.description}
            </Media.Body>
          </Media>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Crew Members</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {this.props.crewMembers.map((member, i) => (
                  <li key={i}><strong>Member ID:</strong> {member.id} - <strong>Points:</strong> {member.points}</li>
                )) }
              </ul>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.editForm} onHide={this.close}>
            <Modal.Header closeButton>
              Update
            </Modal.Header>
            <Modal.Body>
              <CreateCrew name={this.props.currentCrew.crew.name} desc={this.props.currentCrew.crew.description} />
            </Modal.Body>
          </Modal>

          <div>
            {(this.state.showDeleteCrew === true) ? <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
              <h4>Are you sure you want to delete this crew?</h4>
              <p>Once you delete a crew you will lose all data for it.</p>
              <p>
                <Button bsStyle="danger" onClick={this.handleConfirmDeleteCrew} href="/dashboard">Yes, I will delete it</Button>
                <span> or </span>
                <Button onClick={this.handleAlertDismiss}>Nevermind</Button>
              </p>
            </Alert> : '' }
          </div>
        </div>
      );
    }
  }
}


// when you click on list members it should pop over a model showing all the current members

// when you click on a edit profile it should popover a model, which is actually our createcrew form to update and change


// <p onClick={() => this.setState({showModal: true})}>list members</p>
// <p onClick={this.open}>Edit crew profile</p>


// <Button onClick={() => this.setState({showModal: true})}>Show Members</Button>