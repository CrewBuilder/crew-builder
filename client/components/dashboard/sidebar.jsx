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
                      <LinkContainer to={`/dashboard/manage/${container.crew.id}`} key={container.crew.id} onClick={() => this.props.setCurrentCrew(container, true)}>
                        <NavItem activeKey={container.crew.id}
                          value={container.crew.name}
                          key={container.crew.id}
                          className="sidebar-crew-name">
                          {container.crew.name}
                        </NavItem>
                      </LinkContainer>
                    );
                  })}

                  <LinkContainer to={`/dashboard/newcrew`} key='createCrew' >
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
                      <LinkContainer to={`/dashboard/crews/${container.crew.id}`} key={i} onClick={() => this.props.setCurrentCrew(container)}>
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

        <Row>
          <Col smHidden={true} mdHidden={true} lgHidden={true} className="phone-only" >
            <Navbar inverse fixedTop={true} fluid={true}>
              <Nav>
                <NavDropdown eventKey={1} title="My Crews" id="basic-nav-dropdown">
                  {this.props.userLeaderCrews.map((container, i) => {
                    return (
                      <MenuItem componentClass="span" eventKey={i} key={i}>
                        <LinkContainer componentClass="span" to={`/dashboard/manage/${container.crew.id}`} key={container.crew.id} onClick={() => this.props.setCurrentCrew(container)}>
                          <NavItem componentClass="span" activeKey={container.crew.id}
                            value={container.crew.name}
                            key={container.crew.id}
                            className="sidebar-crew-name">
                            {container.crew.name}
                          </NavItem>
                        </LinkContainer>
                      </MenuItem>
                    );
                  })}

                  <LinkContainer componentClass="span" to={`/dashboard/newcrew`} key='createCrew' >
                    <NavItem activeKey='createCrew'
                      value='createCrew'
                      key='createCrew'
                      className="sidebar-crew-name">
                      <Glyphicon glyph="plus" /> create new crew
                    </NavItem>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown eventKey={2} title="Crews I Follow" id="basic-nav-dropdown">
                  {this.props.userMemberCrews.map((container, i) => {
                    return (
                      <MenuItem componentClass="span" eventKey={i} key={i}>
                        <LinkContainer componentClass="span" to={`/dashboard/crews/${container.crew.id}`} key={i} onClick={() => this.props.setCurrentCrew(container)}>
                          <NavItem componentClass="span" activeKey={container.crew.id}
                            value={container.crew.name}
                            key={container.crew.id}
                            className="sidebar-crew-name">
                            {container.crew.name}
                          </NavItem>
                        </LinkContainer>
                      </MenuItem>
                    );
                  })}
                </NavDropdown>
              </Nav>

              {this.props.userMemberCrews && this.props.userMemberCrews.length === 0 ? <p className="sidebar-empty-crews-msg"><Glyphicon glyph="info-sign" /> <em>Just getting started or looking to find that next crew for you? Try our browse or search features to find some crews to join today!</em></p> : null}
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }
}

