import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import {Row, Col, Nav, NavItem, Tab, TagContainer, TabContent, TabPane, Label, Button} from 'react-bootstrap';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'user', 'userCrews', and 'handleCrewClick' function which sets current crew in main view

    this.handleCreateCrew = (val, e) => {
      console.log(val);
    }
  }

  render() {
    return (
      <div>

        <div className="sidebar-user-name">
        <h2>{this.props.user.facebook.DISPLAY_NAME}</h2>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col>
              <h4>My Crews:</h4>
              <Nav bsStyle="pills" stacked>
                {this.props.userCrews.map((crew, key) => {
                  return (
                    <LinkContainer to={`/dashboard/crews/${key}`} key={key} onClick={e => this.props.setCurrentCrew(crew)}>
                      <NavItem activeKey={key}
                        value={crew.name}
                        key={key}
                        className="sidebar-crew-name">
                        {crew.name}
                      </NavItem>
                    </LinkContainer>
                  )
                })}

                <LinkContainer to={`/dashboard/newcrew`} key='createCrew' onClick={e => this.handleCreateCrew('createCrew')}>
                  <NavItem activeKey='createCrew'
                    value='createCrew'
                    key='createCrew'
                    className="sidebar-crew-name">
                    <strong>+ create crew</strong>
                  </NavItem>
                </LinkContainer>

              </Nav>
              <hr />

              <h4>Member of:</h4>
                <p>GreenPeace Meetup</p>
                <p>The Clash</p>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

