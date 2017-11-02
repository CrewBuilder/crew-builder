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

    this.crewSearch = (query) => {
      GetAllCrews(query, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        }

        this.setState({
          searchResults: res || [],
          searchField: query
        });
      });
    }

    // TEMP USERID FOR TESTING
    this.setCurrentCrew = (crew) => {
      this.setState({currentCrew: crew});
      let crewId = crew.crew.id;
      let userId = this.state.user.id;
      console.log('crew', crewId, 'user', userId);
      GetUserTasks(userId, crewId, (err, response) => {
        if (err) {
          console.log('ERROR:', err);
        }

        let userTasks;
        let crewTasks;
        if (!response) {
          userTasks = [];
          crewTasks = [];
        } else {
          userTasks = response.tasksInProgress;
          crewTasks = response.tasksAvailable;
        }
        this.setState({
          userTasks: userTasks,
          currentCrewTasks: crewTasks
        });
      });
    };

    this.getCurrentCrews = (userId) => {
      GetUserCrews(userId, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        } else {
          this.setState({
            userLeaderCrews: res.leader,
            userMemberCrews: res.member
          });
        }
      });
    };

    this.getUserTasks = (userId, crewId) => {
      GetUserTasks(userId, crewId, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        }

        let userTasks;
        let currentCrewTasks;
        if (!res) {
          userTasks = [];
          currentCrewTasks = [];
        } else {
          userTasks = res.tasksInProgress;
          currentCrewTasks = res.tasksAvailable;
        }
        this.setState({
          userTasks: userTasks,
          currentCrewTasks: currentCrewTasks,
        });
      });
    };

  }

  componentDidMount() {
    // get user info
    GetCurrentUser(() => {
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
        let id = userId.id;
        GetUserCrews(id, (err, res) => {
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
    if (!this.state.user) {
      return (
        <div />
      );
    } else {

      return (
        <div className='fadeIn-container component-container'>
          <Navbar
            user={this.state.user}
            crewSearch={this.crewSearch}
            changeLoginStatus={this.props.changeLoginStatus}
          />
          <Grid>
            <Row className="show-grid">
              <Col md={2} lg={3} className="outlineBox sidebar-container">
                <Sidebar
                  user={this.state.user}
                  userLeaderCrews={this.state.userLeaderCrews}
                  userMemberCrews={this.state.userMemberCrews}
                  setCurrentCrew={this.setCurrentCrew}
                />
              </Col>
              <Col md={10} lg={9} className="outlineBox dashboard-container">
                <Main
                  user={this.state.user}
                  getCurrentCrews={this.getCurrentCrews}
                  getUserTasks={this.getUserTasks}
                  currentCrew={this.state.currentCrew}
                  currentCrewTasks={this.state.currentCrewTasks}
                  userTasks={this.state.userTasks}
                  searchResults={this.state.searchResults}
                  searchField={this.state.searchField}
                  setCurrentCrew={this.setCurrentCrew}
                />
              </Col>
              <Clearfix visibleSmBlock></Clearfix>
            </Row>
          </Grid>
          <div className="footer">&copy; 2017 CrewBuilder</div>
        </div>
      );
    }
  }
}
