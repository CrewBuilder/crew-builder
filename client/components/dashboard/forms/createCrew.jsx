// here crew_leader will create a new crew, just a basic layoout... we can change it with react bootstrap later
import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { PostCrew } from '../../utils/requests.jsx';
import { Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import cloudinary from 'cloudinary-core';
import request from 'superagent';

export default class CreateCrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: this.props.name || '',
      description: this.props.desc || '',
      image: null
    };
    // props contain name and unique details of user, so we can keep track of who created this crew  and store it in database accordingly

    this.handleSubmit = (e) => {
      e.preventDefault();
      var formData = new FormData();
      formData.append("picture", this.state.image);

      let options = {
       method: 'POST',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json',
         'x-auth-token': localStorage.getItem('id_token')
       }
      };

      console.log('options', options);
      fetch('/image', options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'data in line 34');
          this.setState({
            url: data.message
          });
          var obj = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.url
          };

          PostCrew(obj, this.props.user.id, (err, data) => {
            if (err) {
              console.log('error in posting');
            } else {
              this.props.getCurrentCrews(props.user.id);
              window.location = '/';
            }
          });
        })
        .catch((errors) => {
          console.log('Login Error: ', errors);
        });
    };

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormControl type="text" name="name" value={this.state.name} placeholder="enter name" onChange={(e) => this.setState({name: e.target.value})}/> <br/>
          <FormControl type="text" name="description" value={this.state.description} placeholder="description" onChange={(e) => this.setState({description: e.target.value})}/> <br/>
          <FormControl type="file" name="pic" onChange={(e) => this.setState({image: e.target.files[0]})}/><br/>
          <button>submit</button>
        </form>
      </div>
    );
  }
}


// <form onSubmit={this.handleSubmitt} id="course-form" ref="form">
          // <input type="text" name="name" value={this.state.name} placeholder="enter name" onChange={(e) => this.setState({name: e.target.value})}/>
          // <input type="text" name="description" value={this.state.description} placeholder="description" onChange={(e) => this.setState({description: e.target.value})}/>
          // <input type="file" name="image" onChange={(e) => this.setState({image: e.target.files[0]})} />
          // <button>Submit</button>
//        </form>

//<FormControl type="text" placeholder="Enter the name of Crew" name="crewname" inputRef={ref => this.name = ref} defaultValue={this.props.name}/><br/>
//           <FormControl componentClass="textarea" placeholder="enter description" inputRef={ref => this.description = ref} defaultValue={this.props.desc}/><br/>
//            <Dropzone
              // muliple="false"
              // accept="image/*"
              // onDrop={this.onImageDrop.bind(this)}>

            //   {this.state.uploadedFileCloudinaryUrl !== '' ?
            //     <div>
            //       <p>{this.state.uploadedFile.name}</p>
            //       <Image cloudName={cloud_name} publicId={this.state.uploadedFileCloudinaryUrl} width="200" crop="scale"/>
            //     </div> : <div>
            //       <p>Drop an image or click to select a file to upload.</p>
            //     </div>}

            // </Dropzone>
            // <input type="file" onChange={this.handleFormData}/>
//            <Button type="submit">
//               Create/Update
//            </Button>


// <Image cloudName="sarikonda" publicId="flower" width="300" crop="scale"/>
