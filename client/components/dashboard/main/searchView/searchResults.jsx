//This view should be called when the user is Searching (isSearching === true)
//We will render a list of crews based on the props passed in.
//Expect 'props.crews' to be an array of crews.
//This can be all the crews for starters. The search engine should eventually filter it down.

import React, { Component } from 'react';
import SearchCard from './searchCard.jsx';

import { Pagination } from 'react-bootstrap';

import { JoinACrew } from '../../../utils/requests.jsx';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      activePage: 1,
      rangeLow: 0,
      rangeHigh: 5
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

    this.handleSelect = (eventKey) => {
      this.setState({
        activePage: eventKey,
        rangeLow: ((5 * eventKey) - 5),
        rangeHigh: (5 * eventKey)
      });
    }
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

      const searchResultsLength = Math.ceil(this.props.searchResults.length / 5);
      console.log(searchResultsLength);
      return (
        <div className="fadeIn-container">
          <h4>{browseOrSearch}...</h4>
          {searchResultsLength > 0 ?
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            bsSize="large"
            items={searchResultsLength}
            maxButtons={searchResultsLength}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
          />
          : null }
          <hr />
          <div className="search-crew-list">
            {this.props.searchResults.map((crew, i) => {
              if(i >= this.state.rangeLow && i < this.state.rangeHigh) {
              return (
                <SearchCard key={i} crew={crew} joinCrew={this.joinCrew} />
              )
              }
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

