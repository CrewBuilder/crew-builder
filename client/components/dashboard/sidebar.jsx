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
              <h4>Crews I Lead:</h4>
              <Nav bsStyle="pills" stacked>
                {this.props.userLeaderCrews.map((container) => {
                  return (
                    <LinkContainer to={`/dashboard/crews/${container.crew.id}`} key={container.crew.id} onClick={e => this.props.setCurrentCrew(container)}>
                      <NavItem activeKey={container.crew.id}
                        value={container.crew.name}
                        key={container.crew.id}
                        className="sidebar-crew-name">
                        {container.crew.name}
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

              <h4>Crews I Belong To:</h4>
              <Nav bsStyle="pills" stacked>
                {this.props.userMemberCrews.map((container) => {
                  return (
                    <LinkContainer to={`/dashboard/crews/${container.crew.id}`} key={container.crew.id} onClick={e => this.props.setCurrentCrew(container)}>
                      <NavItem activeKey={container.crew.id}
                        value={container.crew.name}
                        key={container.crew.id}
                        className="sidebar-crew-name">
                        {container.crew.name}
                      </NavItem>
                    </LinkContainer>
                  )
                })}
              </Nav>
              <hr />

              <p><em>{this.props.userMemberCrews && this.props.userMemberCrews.length === 0 ? 'Just getting started or looking to find that next crew for you? Try our browse or search features to find some crews to join today!' : null}</em></p>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

// <Nav bsStyle="pills" stacked>
//                 {this.props.userCrews.leader.map((crew) => {
//                   return (
//                     <LinkContainer to={`/dashboard/crews/${key}`} key={crew.id} onClick={e => this.props.setCurrentCrew(crew)}>
//                       <NavItem activeKey={crew.id}
//                         value={crew.name}
//                         key={crew.id}
//                         className="sidebar-crew-name">
//                         {crew.name}
//                       </NavItem>
//                     </LinkContainer>
//                   )
//                 })}

//                 <LinkContainer to={`/dashboard/newcrew`} key='createCrew' onClick={e => this.handleCreateCrew('createCrew')}>
//                   <NavItem activeKey='createCrew'
//                     value='createCrew'
//                     key='createCrew'
//                     className="sidebar-crew-name">
//                     <strong>+ create crew</strong>
//                   </NavItem>
//                 </LinkContainer>

//               </Nav>
//               <hr />

//               <h4>Crews I Belong To:</h4>
//               <Nav bsStyle="pills" stacked>
//                 {this.props.userCrews.member.map((crew) => {
//                   return (
//                     <LinkContainer to={`/dashboard/crews/${key}`} key={crew.id} onClick={e => this.props.setCurrentCrew(crew)}>
//                       <NavItem activeKey={crew.id}
//                         value={crew.name}
//                         key={crew.id}
//                         className="sidebar-crew-name">
//                         {crew.name}
//                       </NavItem>
//                     </LinkContainer>
//                   )
//                 })}

//               </Nav>