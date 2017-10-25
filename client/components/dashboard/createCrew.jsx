// here crew_leader will create a new crew, just a basic layoout... we can change it with react bootstrap later
import React, { Component } from 'react';

class CreateCrew extends Component {
  constructor(props) {
    super(props);
    // props contain name and unique details of user, so we can keep track of who created this crew
  }

  render() {
    return (
      <div>
        <form>
         <input type="text" placeholder="Enter the name of Crew" name="crewname"/><br/>
         <textarea name="description">Description</textarea><br/>
         <input type="file" name="img" className="img"/><br/>
         <input type="submit"/>
        </form>
      </div>
    )
  }
}