// here crew_leader will create a new crew, just a basic layoout... we can change it with react bootstrap later
import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { PostCrew } from '../../utils/requests.jsx';
import { Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import cloudinary from 'cloudinary-core';
import request from 'superagent';
// import {cloud_name, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL} from './configfile.js'

export default class CreateCrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: ''
    }
    // props contain name and unique details of user, so we can keep track of who created this crew  and store it in database accordingly

    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.name)
      console.log(this.desc);
      console.log(this.img)
      var obj = {
        name: this.name.value,
        description: this.description.value,
        image: this.state.uploadedFileCloudinaryUrl
      }
      this.refs.form.reset()
      console.log(obj)
      PostCrew(obj, this.props.user.id, function (err, data) {
        if (err) {
          console.log('error in posting');
        }
        if (data) {
          props.getCurrentCrews(props.user.id);
          console.log(data, 'data from posting');
          //document.getElementById("course-form").reset();
        }
      })
    }
  }



  image(e) {
    this.img = e.target.value
    console.log(this.img, 'thisimg')
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    }, function(err, done) {
      if (done) {
        console.log(this.state.uploadedFile)
      }
    })
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
  // let upload = request.post(process.env.CLOUDINARY_UPLOAD_URL || CLOUDINARY_UPLOAD_URL)
  //                     .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || CLOUDINARY_UPLOAD_PRESET)
  //                     .field('file', file)

  // DEPLOYED VERSION USING ENVIRONMENT VARIABLES
  let upload = request.post(process.env.CLOUDINARY_UPLOAD_URL)
                      .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
                      .field('file', file)

  upload.end((err, response) => {
    if (err) {
      console.log(err);
    }

    if (response.body.secure_url !== '') {
      this.setState({
        uploadedFileCloudinaryUrl: response.body.secure_url
      });
    }
  })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="course-form" ref="form">
          <FormGroup>
            <FormControl type="text" placeholder="Enter the name of Crew" name="crewname" inputRef={ref => this.name = ref} defaultValue={this.props.name}/><br/>
            <FormControl componentClass="textarea" placeholder="enter description" inputRef={ref => this.description = ref} defaultValue={this.props.desc}/><br/>
            <Dropzone
              muliple="false"
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>

              {this.state.uploadedFileCloudinaryUrl !== '' ?
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <Image cloudName={process.env.CLOUD_NAME} publicId={this.state.uploadedFileCloudinaryUrl} width="200" crop="scale"/>
              </div> : <div>
              <p>Drop an image or click to select a file to upload.</p>
              </div>}

            </Dropzone>
            <Button type="submit">
               Create/Update
            </Button>
        </FormGroup>
        </form>
      </div>
    )
  }
}

// <Image cloudName="sarikonda" publicId="flower" width="300" crop="scale"/>

// DEPLOYED VERSION USING ENVIRONMENT VARIABLES - ~line 100
// <Image cloudName={process.env.CLOUD_NAME} publicId={this.state.uploadedFileCloudinaryUrl} width="200" crop="scale"/>

// local test version - ~line 100
// <Image cloudName={process.env.CLOUD_NAME || cloud_name} publicId={this.state.uploadedFileCloudinaryUrl} width="200" crop="scale"/>
