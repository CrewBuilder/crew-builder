// here crew_leader will create a new crew, just a basic layoout... we can change it with react bootstrap later
import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
export default class CreateCrew extends Component {
  constructor(props) {
    super(props);
    // props contain name and unique details of user, so we can keep track of who created this crew  and store it in database accordingly
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.name)
    console.log(this.desc);
    console.log(this.img)
    var obj = {
      name: this.name.value,
      desc: this.description.value,
      img: this.img
    }
    console.log(obj)
  }

  image(e) {
    this.img = e.target.value
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
         <FormControl type="text" placeholder="Enter the name of Crew" name="crewname" inputRef={ref => this.name = ref} defaultValue={this.props.name}/><br/>
         <FormControl componentClass="textarea" placeholder="enter description" inputRef={ref => this.description = ref} defaultValue={this.props.desc}/><br/>
         <FormControl type="file" name="img" className="img" accept="image/*" onChange={this.image.bind(this)}/><br/>
         <Button type="submit">
           Create/Update
        </Button>
      </FormGroup>
      </form>
      </div>
    )
  }
}