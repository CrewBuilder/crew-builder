//This view should be called when the user is Searching (isSearching === true)
//We will render a list of crews based on the props passed in.
//Expect 'props.crews' to be an array of crews.
  //This can be all the crews for starters. The search engine should eventually filter it down.

import React, { Component } from 'react';
import SearchCard from './searchCard';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'crews'
  }

  render() {
    return (
      <div>
        <div className="search-crew-list">
          {this.props.crews.map((crew, i) => {
            return (
              <SearchCard crew={crew} />
            )
          })}
        </div>
        {this.props.crews.length === 0 ?
          <div className="no-crew-message">
            <h2><em>
              No crews match that query. Try again or click browse!
            </em></h2>
          </div> : ''}
      </div>
    )
  }
}
