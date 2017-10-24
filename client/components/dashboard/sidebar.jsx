import React, { Component } from 'react';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'user', 'userCrews', and 'handleCrewClick' function which sets current crew in main view
  }

  render() {
    return (
      <div>
        <div className="sidebar-crew-list">
          {this.props.userCrews.map((crew, i) => {
            return (
              <div onClick={this.props.handleCrewClick} className="sidebar-crew-name">{crew.name}</div>
            )
          })}
        </div>
        {this.props.userCrews.length === 0 ?
          <div className="no-crews-message">
            <h2><em>
              You don't have any crews! Use the searchbar to find one.
            </em></h2>
          </div> : ''}
      </div>
    )
  }
}