import React, { Component } from 'react';
import { Media, Image, Modal } from 'react-bootstrap';

export default class crewLeaderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.close = () => {
    this.setState({showModal: false})
  }
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
            <p onClick={() => this.setState({showModal: true})}>list members</p>
            <p>Edit crew profile</p>
          </Media.Body>
        </Media>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Heading</Modal.Title>
          </Modal.Header>
            </Modal>
      </div>
    )
  }
}

// when you click on list members it should pop over a model showing all the current members

// when you click on a edit profile it should popover a model, which is actually our createcrew form to update and change