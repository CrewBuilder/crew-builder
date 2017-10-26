//This view should be called when the user is Searching (isSearching === true)
//We will render a list of crews based on the props passed in.
//Expect 'props.crews' to be an array of crews.
  //This can be all the crews for starters. The search engine should eventually filter it down.

import React, { Component } from 'react';
import SearchCard from './searchCard.jsx';

let crews = [
  {
    "name": 'Strings Attached',
    "description": 'I started Strings Attached as a genre-blurring collaboration with folk artists. Our vision was to fuse jazz and classical flavors with the contemporary singer/songwriter genre; to dress it up with a little different jewelry. From the classical tradition we borrowed the architectural precision of composition and arranging. From jazz we brought the performance ethic. The ability to abandon the score and make choices spontaneously, in response to each other and the present musical moment. And then there\'s that irresistable sense of"swing" - the thing that gets people dancing.',
    "image": 'http://www.celebratewithstringsattached.com/uploads/3/5/4/6/3546135/1090860.jpg'
  },
  {
    "name": "Zieme, Nitzsche and Murazik",
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    "image": "http://dummyimage.com/201x122.jpg/ff4444/ffffff"
  }, {
    "name": "Wisoky, Reynolds and Runte",
    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "image": "http://dummyimage.com/133x158.bmp/5fa2dd/ffffff"
  }
]

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'crews'
  }

  render() {
    return (
      <div>
        {crews.map((crew) =>
          <SearchCard crew={crew}/>
        )}
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