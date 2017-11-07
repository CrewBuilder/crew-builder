import React, { Component } from 'react';

import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import { GetCrewRewards, GetUserCrews, GetUserTasks, GetCrewTasks, GetAllCrews, GetLeaderTasks, UpdateTask } from '../utils/requests.jsx';

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
      currentCrewRewards: [],
      currentTasksToConfirm: [],
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
    };

    // need to fix if/else logic and add get crew tasks for leader
    this.setCurrentCrewLeader = (crew) => {
      this.setState({
        currentCrew: crew
      });
      let crewTasks = [];
      let rewards = [];
      let leaderTasks = [];
      GetCrewRewards(crew.crew.id, (err, resCrewRewards) => {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('RESCREWTASKS', resCrewTasks);
          rewards = resCrewRewards;
        }
        GetCrewTasks(crew.crew.id, (err, resCrewTasks) => {
          if (err) {
            console.log('ERROR:', err);
          } else {
            console.log('RESCREWTASKS', resCrewTasks);
            crewTasks = resCrewTasks;
          }
          // GetLeaderTasks(crew.crew.id, (err, resLeadTasks) => {
          //   if (err) {
          //     console.log('ERROR:', err);
          //   } else {
          //     console.log('RESLEADTASKS', resLeadTasks);
          //     leaderTasks = resLeadTasks;
          //   }
          this.setState({
            currentCrewRewards: rewards,
            currentTasksToConfirm: [],
            currentCrewTasks: crewTasks
          });
          console.log('STATE', this.state);
          // });
        });
      });
    };

    this.setCurrentCrewMember = (crew) => {
      this.setState({
        currentCrew: crew
      });
      let crewRewards = [];
      let userTasks = [];
      let crewTasks = [];
      GetCrewRewards(crew.crew.id, (err, rewards) => {
        if (err) {
          console.log('Error', err);
        } else {
          crewRewards = rewards;
          console.log('rewards',crewRewards);
        }
        GetUserTasks(this.state.user.id, crew.crew.id, (err, tasks) => {
          if (err) {
            console.log('ERROR:', err);
          } else {
            console.log('Tasks', tasks);
            userTasks = tasks.tasksInProgress;
            crewTasks = tasks.tasksAvailable;
          }
          this.setState({
            userTasks: userTasks,
            currentCrewTasks: crewTasks,
            currentCrewRewards: rewards
          });
          console.log('State', this.state);
        });
      });
    };


    this.getCurrentRewards = (crew) => {
      GetCrewRewards(crew.crew.id, (err, res) => {
        this.setState({
          currentCrewRewards: res
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

    this.getUserTasks = (userId, crew_id) => {
      GetUserTasks(userId, crew_id, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        }

        let userTasks, currentCrewTasks;
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

    this.getCrewTasks = (crew_id) => {
      GetCrewTasks(crew_id, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
          this.setState({
            currentCrewTasks: []
          });
        } else {
          this.setState({
            currentCrewTasks: res
          });
        }
      });
    };

    // (userTaskId, verified = false, cb)
    this.handleMemberRequestVerification = (userTaskId, verified) => {
      let verifyTask = verified ? true : null;
      UpdateTask(userTaskId, verifyTask, (err, res) => {
        if (err) {
          console.log('ERROR:', err);
        } else {
          console.log('OK HANDLED handleMemberRequestVerification');
          this.setCurrentCrewLeader(this.state.currentCrew);
        }
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
          this.setState({
            user: user
          });
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
        <div className='fadeIn-container component-container clearfix'>
          <Navbar
            history={this.props.history}
            user={this.state.user}
            crewSearch={this.crewSearch}
            changeLoginStatus={this.props.changeLoginStatus}
          />
          <Grid>
            <Row className="show-grid clearfix">
              <Col xs={10} sm={2} md={2} lg={3} className="outlineBox sidebar-container">
                <Sidebar
                  user={this.state.user}
                  userLeaderCrews={this.state.userLeaderCrews}
                  userMemberCrews={this.state.userMemberCrews}
                  setCurrentCrewMember={this.setCurrentCrewMember}
                  setCurrentCrewLeader={this.setCurrentCrewLeader}
                />
              </Col>
              <Col xs={12} sm={10} md={10} lg={9} className="clearfix outlineBox dashboard-container">
                <Main
                  user={this.state.user}
                  getCurrentCrews={this.getCurrentCrews}
                  getUserTasks={this.getUserTasks}
                  getCrewTasks={this.getCrewTasks}
                  currentCrew={this.state.currentCrew}
                  currentCrewTasks={this.state.currentCrewTasks}
                  currentCrewRewards={this.state.currentCrewRewards}
                  currentTasksToConfirm={this.state.currentTasksToConfirm}
                  handleMemberRequestVerification={this.handleMemberRequestVerification}
                  userTasks={this.state.userTasks}
                  searchResults={this.state.searchResults}
                  searchField={this.state.searchField}
                  setCurrentCrewMember={this.setCurrentCrewMember}
                  setCurrentCrewLeader={this.setCurrentCrewLeader}
                  getCurrentRewards={this.getCurrentRewards}
                />
              </Col>

            </Row>
          </Grid>
          <div className="footer">&copy; 2017 CrewBuilder</div>
        </div>
      );
    }
  }
}
