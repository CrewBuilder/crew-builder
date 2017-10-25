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
    }
  }

  render() {

    return (
      <div>
      <Navbar/>
      <Grid>
        <Row className="show-grid">
          <Col md={2} lg={3}><Sidebar userCrews={this.state.userCrews} /></Col>
          <Col md={10} lg={9}><Main /></Col>
          <Clearfix visibleSmBlock></Clearfix>
        </Row>
      </Grid>
      <Main />
      </div>
    )
  }
}