import React, { Component } from 'react';
import { Media, Image, Modal } from 'react-bootstrap';
// import editForm from './../../forms/createCrew.jsx'
import CreateCrew from './../../forms/createCrew.jsx'

export default class crewLeaderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editForm: false
    };

    this.open = () => {
      this.setState({editForm: true})
    }

    this.close = () => {
      this.setState({showModal: false});
      this.setState({editForm: false})
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
            <p onClick={this.open}>Edit crew profile</p>
          </Media.Body>
        </Media>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Heading</Modal.Title>
          </Modal.Header>
        </Modal>

        <Modal show={this.state.editForm} onHide={this.close}>
          <Modal.Header closeButton>
            Update
          </Modal.Header>
          <Modal.Body>
            <CreateCrew name={this.props.currentCrew.name} desc={this.props.currentCrew.description}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

// when you click on list members it should pop over a model showing all the current members

// when you click on a edit profile it should popover a model, which is actually our createcrew form to update and change