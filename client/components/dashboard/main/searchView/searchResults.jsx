//This view should be called when the user is Searching (isSearching === true)
//We will render a list of crews based on the props passed in.
//Expect 'props.crews' to be an array of crews.
  //This can be all the crews for starters. The search engine should eventually filter it down.

import React, { Component } from 'react';
import SearchCard from './searchCard.jsx';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'crews'
  }

  render() {

    let userData = {
      "facebookId": '1',
      "facebook": {
        "DISPLAY_NAME": "ionajewel",
        "EMAIL": "ipjwilli@gmail.com",
        "IMAGE_URL": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
      }
    };

    let crewData = [{
    "name": "Zieme, Nitzsche and Murazik",
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    "image": "http://dummyimage.com/201x122.jpg/ff4444/ffffff"
  }, {
    "name": "Wisoky, Reynolds and Runte",
    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    "image": "http://dummyimage.com/201x122.jpg/44ffff/ffffff"
  }, {
    "name": "Leannon-Lehner",
    "description": "Maecenas pulvinar lobortis est. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "image": "http://dummyimage.com/201x122.jpg/ffa244/000000"
  }, {
    "name": "Dooley Group",
    "description": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Praesent blandit.",
    "image": "http://dummyimage.com/201x122.jpg/44ff44/ffffff"
  }];

    return (
      <div>
        <div className="search-crew-list">
          {crewData.map((crew, i) => {
            return (
              <SearchCard key={i} crew={crew} />
            )
          })}
        </div>
        {userData.length === 0 ?
          <div className="no-crew-message">
            <h2><em>
              No crews match that query. Try again or click browse!
            </em></h2>
          </div> : ''}
      </div>
    )
  }
}


// MOVED DOWN TO TEST WITHOUT PROPS
// <div>
//   <div className="search-crew-list">
//     {this.props.crews.map((crew, i) => {
//       return (
//         <SearchCard crew={crew} />
//       )
//     })}
//   </div>
//   {this.props.crews.length === 0 ?
//     <div className="no-crew-message">
//       <h2><em>
//         No crews match that query. Try again or click browse!
//       </em></h2>
//     </div> : ''}
// </div>