//This view should be called when the user is Searching (isSearching === true)
//We will render a list of crews based on the props passed in.
//Expect 'props.crews' to be an array of crews.
//This can be all the crews for starters. The search engine should eventually filter it down.

import React, { Component } from 'react';
import SearchCard from './searchCard.jsx';
import { JoinACrew } from '../../../utils/requests.jsx';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,

    };
    // Expect 'props' to contain 'crews'
    this.joinCrew = (crew) => {
      let crewId = crew.id;
      let userId = this.props.user.id;
      JoinACrew(userId, crewId, (err, data) => {
        if(err) {
          console.log('Error', err);
        } else {
          console.log('Data', data);
          props.getCurrentCrews(userId);
        }
      });

    };
  }

  render() {

    if(!this.props.searchResults){
      return (
        <div />
      )
    } else {

      const browseOrSearch = this.props.searchField ?
        `Search results for ${this.props.searchField}` :
        `Browse some of our crews to join`;

      return (
        <div className="fadeIn-container">
          <h4>{browseOrSearch}...</h4>
          <hr />
          <div className="search-crew-list">
            {this.props.searchResults.map((crew, i) => {
              return (
                <SearchCard key={i} crew={crew} joinCrew={this.joinCrew} />
              )
            })}
          </div>
          {this.props.searchField && this.props.searchResults.length === 0 ?
            <div className="no-crew-message">
              <h2><em>
                No crews match that query. Try again or click browse!
              </em></h2>
            </div> : ''}
        </div>
      )
    }
  }
}

