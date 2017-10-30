import React, { Component } from 'react';

import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import { GetUserCrews } from '../utils/requests.jsx';
// import { GetAllCrews } from '../utils/requests.jsx';

import { GetCurrentUser } from '../utils/auth.jsx';

import Navbar from './navbar/navbar.jsx';
import Sidebar from './sidebar.jsx';
import Main from './main/main.jsx';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userLeaderCrews: [],
      userMemberCrews: [],
      userTasks: [],
      currentCrew: null,
      searchResults: [],
      searchField: '',
      loaded: false
    };

    this.submitSearch = (query, e) => {
      console.log('SEARCH: ', query);
      this.setState({searchField: query});
    };

    this.browseSearch = () => {
      console.log('NAV BROWSE CLICKED');
      // GetAllCrews((res) => {
      //   this.setState({searchResults: res});
      // })
      this.setState({searchField: null});
    };

    this.setCurrentCrew = (crew, e) => {
      console.log('SIDEBAR SET CURRENT CREW CLICKED');
      this.setState({currentCrew: crew});
    };

  }

  componentWillMount() {
    // set initial data while building out with apis
    this.setState({
      user: {
        "facebookId": '1',
        "facebook": {
          "DISPLAY_NAME": "",
          "EMAIL": "",
          "IMAGE_URL": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        }
      },
      userTasks: [{
        "name": "Bergstrom, Blanda and Hamill",
        "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "points": 86,
        "expiry": "2017-09-14T09:32:33Z",
        "limit": 14,
        "crewId": 2
      }, {
        "name": "Zemlak, Koepp and Schoen",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "points": 13,
        "expiry": "2017-06-01T01:07:43Z",
        "limit": 83,
        "crewId": 13
      }, {
        "name": "Waters and Sons",
        "description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
        "points": 42,
        "expiry": "2017-03-05T22:58:30Z",
        "limit": 22,
        "crewId": 4
      }, {
        "name": "Jacobi-Schiller",
        "description": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "points": 81,
        "expiry": "2017-07-21T08:19:26Z",
        "limit": 32,
        "crewId": 13
      }, {
        "name": "Heller Inc",
        "description": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "points": 13,
        "expiry": "2017-06-11T15:21:19Z",
        "limit": 36,
        "crewId": 6
      }, {
        "name": "Kunde Inc",
        "description": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "points": 20,
        "expiry": "2017-02-14T03:01:20Z",
        "limit": 86,
        "crewId": 3
      }],
      searchResults: [{
        "name": "Predovic, Rodriguez and Ebert",
        "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
        "image": "http://dummyimage.com/201x122.jpg/012C40/000000"
      }, {
        "name": "Daugherty-Bergnaum",
        "description": "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "image": "http://dummyimage.com/201x122.jpg/FF404C/ffffff"
      }, {
        "name": "O'Keefe-Ryan",
        "description": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
        "image": "http://dummyimage.com/201x122.jpg/1CA5B8/ffffff"
      }, {
        "name": "Anderson-Bailey",
        "description": "Cras non velit nec nisi vulputate nonummy.",
        "image": "http://dummyimage.com/201x122.jpg/5fa2dd/ffffff"
      }, {
        "name": "Farrell Inc",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "image": "http://dummyimage.com/201x122.jpg/B88F4B/ffffff"
      }]
    });
  }


  componentDidMount() {
    // get user info
    GetCurrentUser((res) => {
      return res;
    })
      .then((user) => {
        if (user === false) {
          this.props.changeLoginStatus();
          console.log('NOT LOGGED IN');
        } else {
          this.setState({user: user});
          return user;
        }
      }).then((userId) => {
        // get user crews using userId.id
        GetUserCrews(12, (err, res) => {
          if (err) {
            console.log('ERROR:', err);
            this.setState({ loaded: true });
          } else {
            // LOADED IS IMPORTANT TO PREVENT SIDEBAR ISSUES
            this.setState({
              userLeaderCrews: res.leader,
              userMemberCrews: res.member,
              loaded: true
            });
          }
        });
      });

  }


  render() {

    return (
      <div>
        <Navbar
          user={this.state.user}
          changeLoginStatus={this.props.changeLoginStatus}
          submitSearch={this.submitSearch}
          browseSearch={this.browseSearch}
        />
        <Grid>
          <Row className="show-grid">
            <Col md={2} lg={3} className="outlineBox">
              { this.state.loaded ?
              <Sidebar
                user={this.state.user}
                userLeaderCrews={this.state.userLeaderCrews}
                userMemberCrews={this.state.userMemberCrews}
                setCurrentCrew={this.setCurrentCrew}
              />
              : null }
            </Col>
            <Col md={10} lg={9} className="outlineBox background-image">
              <Main
                user={this.state.user}
                currentCrew={this.state.currentCrew}
                userTasks={this.state.userTasks}
                searchResults={this.state.searchResults}
                searchField={this.state.searchField}
              />
            </Col>
            <Clearfix visibleSmBlock></Clearfix>
          </Row>
        </Grid>
      </div>
    );
  }
}