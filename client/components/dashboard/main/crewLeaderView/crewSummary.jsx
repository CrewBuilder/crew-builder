import React, { Component } from 'react';
import { Media, Modal, ButtonGroup, Button, Image } from 'react-bootstrap';
// import editForm from './../../forms/createCrew.jsx'
import { Transformation } from 'cloudinary-react';
import CreateCrew from './../../forms/createCrew.jsx'
import { cloud_name, Image_Url } from '../../forms/config.js'

export default class crewLeaderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editForm: false,
      checkMembers: false
    };

    this.open = () => {
      this.setState({editForm: true})
    }

    this.close = () => {
      this.setState({showModal: false});
      this.setState({editForm: false})
    }

    this.checkMembers = () => {
        this.props.getCrewMember(this.props.currentCrew.crew.id);
        this.setState({
          checkMembers: true,
          showModal: true
        });
    }
  }

  // componentDidMount() {
  //   // this.props.getCrewMember(this.props.currentCrew.crew.id);
  //   console.log(this.props.currentCrew.crew.id);
  // }

  render() {
    if(!this.props.currentCrew) {
      return (
        <div />
      )
    } else {
    // console.log(this.props.currentCrew.crew.image, 'image')
    var str = this.props.currentCrew.crew.image;
    str = str.split('/')
    var publicId = str[str.length - 1]
    return (
      <div>
        <Media>
          <Media.Left>
            <Image src={Image_Url + publicId} alt="Image"/>
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {this.props.currentCrew.crew.name}
            </Media.Heading>
            <ButtonGroup>
              <Button onClick={this.checkMembers}>Show Members</Button>
              <Button onClick={this.open}>Edit Crew</Button>
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
            <CreateCrew name={this.props.currentCrew.crew.name} desc={this.props.currentCrew.crew.description}/>
          </Modal.Body>
        </Modal>
      </div>
    )
    }
  }
}


// when you click on list members it should pop over a model showing all the current members

// when you click on a edit profile it should popover a model, which is actually our createcrew form to update and change


            // <p onClick={() => this.setState({showModal: true})}>list members</p>
            // <p onClick={this.open}>Edit crew profile</p>



            // <Button onClick={() => this.setState({showModal: true})}>Show Members</Button>