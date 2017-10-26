import React, { Component } from 'react';

import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import Navbar from './navbar/navbar.jsx';
import Sidebar from './sidebar.jsx';
import Main from './main/main.jsx';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userCrews: [],
      userTasks: [],
      isSearching: true,
    }

    this.submitSearch = (query) => {
      console.log('search query made');
    }
    this.browserSearch = () => {
      this.setState({isSearching: !this.state.isSearching});
    }
  }

  render() {

    return (
      <div>
      <Link to="/dashboard/results">
        Browse Results
      </Link>
      <Link to="/dashboard/crewview">
        CrewView
      </Link>
      <Navbar
        submitSearch={this.submitSearch}
        browserSearch={this.browserSearch}
      />
      <Grid>
        <Row className="show-grid">
          <Col md={2} lg={3} className="outlineBox">
            <Sidebar
              userCrews={this.state.userCrews}
            />
          </Col>
          <Col md={10} lg={9} className="outlineBox">
            <Main
              isSearching={this.state.isSearching}
            />
          </Col>
          <Clearfix visibleSmBlock></Clearfix>
        </Row>
      </Grid>
      </div>
    )
  }
}