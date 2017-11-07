import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { MenuItem, NavDropdown, Navbar, Row, Col, Nav, NavItem, Tab, TagContainer, TabContent, TabPane, Label, Button, Glyphicon } from 'react-bootstrap';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'user', 'userCrews', and 'handleCrewClick' function which sets current crew in main view
  }

  render() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col xsHidden={true}>
              <span className="hidden-phone">
                <h4 className="sidebar-heading">My Crews:</h4>
                <Nav bsStyle="pills" stacked>
                  {this.props.userLeaderCrews.map((container) => {
                    return (
                      <LinkContainer to={`/dashboard/manage/${container.crew.id}`} key={container.crew.id} onClick={() => this.props.setCurrentCrewLeader(container)}>
                        <NavItem activeKey={container.crew.id}
                          value={container.crew.name}
                          key={container.crew.id}
                          className="sidebar-crew-name">
                          {container.crew.name}
                        </NavItem>
                      </LinkContainer>
                    );
                  })}

                  <LinkContainer to={'/dashboard/newcrew'} key='createCrew' >
                    <NavItem activeKey='createCrew'
                      value='createCrew'
                      key='createCrew'
                      className="sidebar-crew-name">
                      <Glyphicon glyph="plus" /> create new crew
                    </NavItem>
                  </LinkContainer>
                </Nav>
                <h4 className="sidebar-heading">Crews I Follow:</h4>
                <Nav bsStyle="pills" stacked>
                  {this.props.userMemberCrews.map((container, i) => {
                    return (
                      <LinkContainer to={`/dashboard/crews/${container.crew.id}`} key={i} onClick={() => this.props.setCurrentCrewMember(container)}>
                        <NavItem activeKey={container.crew.id}
                          value={container.crew.name}
                          key={container.crew.id}
                          className="sidebar-crew-name">
                          {container.crew.name}
                        </NavItem>
                      </LinkContainer>
                    );
                  })}
                </Nav>
              </span>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}




