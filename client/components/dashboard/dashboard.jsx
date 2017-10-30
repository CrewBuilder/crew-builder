import React, { Component } from 'react';

import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import { GetUserCrews, GetUserTasks, GetCrewTasks, GetAllCrews } from '../utils/requests.jsx';

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
      currentCrewTasks: [],
      searchResults: [],
      searchField: ''
    };

    this.submitSearch = (query, e) => {
      console.log('SEARCH: ', query);
      this.setState({searchField: query});
    };

    this.browseSearch = () => {
      GetAllCrews((err, res) => {
        if(err) {
          console.log('ERROR:', err);
        }
          this.setState({
            searchResults: res || [],
            searchField: null
          });
      })
    };

    // TEMP USERID FOR TESTING
    this.setCurrentCrew = (crew, e) => {
      let crewId = crew.crew.id;
      let userId = this.state.user.id;

      GetCrewTasks(crewId, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        }
        GetUserTasks(2, crewId, (err, response) => {
          if (err) {
            console.log('ERROR:', err);
          }
          this.setState({
            userTasks: response || [],
            currentCrewTasks: res || [],
            currentCrew: crew
          });
        })
      })
    };
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
      GetUserCrews(1, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        } else {
          this.setState({
            userLeaderCrews: res.leader,
            userMemberCrews: res.member
          });
        }
      });
    });
  }


  render() {

    if(!this.state.user) {
      return (
        <div />
      )
    } else {

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
                <Sidebar
                  user={this.state.user}
                  userLeaderCrews={this.state.userLeaderCrews}
                  userMemberCrews={this.state.userMemberCrews}
                  setCurrentCrew={this.setCurrentCrew}
                />
              </Col>
              <Col md={10} lg={9} className="outlineBox">
                <Main
                  user={this.state.user}
                  currentCrew={this.state.currentCrew}
                  currentCrewTasks={this.state.currentCrewTasks}
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
}