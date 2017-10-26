// Here we will populate a 'card' entry for Each crew in a search results.

import React, { Component } from 'react';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'crew' and 'handleCrewClick' function which sets current crew in main view
  }

  render() {
    return (

      <div className="crew-card">
        <h1 className="crew-name">
          {this.props.crew.name}
        </h1>
        <div className="crew-image">
          <img src={this.props.crew.image} />
        </div>
        <div className="crew-description">
          {this.props.crew.description}
        </div>
      </div>
    )
  }
}


      // <div className="crew-card">
      //   <div className="crew-name">
      //     {this.props.crew.name}
      //   </div>
      //   <div className="crew-image">
      //     <img src={this.props.crew.image} />
      //   </div>
      //   <div className="crew-description">
      //     {this.props.crew.description}
      //   </div>
      // </div>