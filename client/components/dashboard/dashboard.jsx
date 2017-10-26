import React, { Component } from 'react';

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
      isSearching: false,
    }

    this.submitSearch = (query) => {
      console.log('search query made');

    }
    this.browseSearch = () => {
      console.log('search browse made');
      this.setState({isSearching: true})
    }
  }

  render() {

    return (
      <div>
      <Navbar
        submitSearch={this.submitSearch}
        browseSearch={this.browseSearch}
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