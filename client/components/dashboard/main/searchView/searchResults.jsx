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
      activePage: 1,
      rangeLow: 0,
      rangeHigh: 3,
    };
    // Expect 'props' to contain 'crews'
    this.joinCrew = (crew) => {
      let crew_id = crew.id;
      let user_id = this.props.user.id;
      JoinACrew(user_id, crew_id, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          // console.log('Data', data);
          props.getCurrentCrews(user_id);
        }
      });

    };

    // handle range of paginated items
    this.handleSelect = (eventKey) => {
      this.setState({
        activePage: eventKey,
        rangeLow: ((3 * eventKey) - 3),
        rangeHigh: (3 * eventKey)
      });
    };

  }

  // reset pagination on search
  componentWillReceiveProps(nextProps) {
    this.setState({
      activePage: 1,
      rangeLow: 0,
      rangeHigh: 3
    });
  }

  render() {

    if (!this.props.searchResults) {
      return (
        <div />
      );
    } else {

      const browseOrSearch = this.props.searchField ?
        `Search results for ${this.props.searchField}` :
        'Browse some of our crews to join';

      const searchResultsLength = Math.ceil(this.props.searchResults.length / 3);
      return (
        <div className="fadeIn-container">
          <h4 className="search-results-heading">{browseOrSearch}...</h4>
          {searchResultsLength > 0 ?
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              bsSize="medium"
              items={searchResultsLength}
              maxButtons={searchResultsLength}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
            />
            : null }
          <hr />
          <div className="search-crew-list">
            {this.props.searchResults.map((crew, i) => {
              if (i >= this.state.rangeLow && i < this.state.rangeHigh) {
                return (
                  <SearchCard key={i} crew={crew} count={i} joinCrew={this.joinCrew} />
                );
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
      );
    }
  }
}

