import React, { Component } from 'react';
import {Row, Col, Nav, NavItem, Tab, TagContainer, TabContent, TabPane, Label} from 'react-bootstrap';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    // Expect 'props' to contain 'user', 'userCrews', and 'handleCrewClick' function which sets current crew in main view
    let userData = {
      "facebookId": '1',
      "facebook": {
        "DISPLAY_NAME": "ionajewel",
        "EMAIL": "ipjwilli@gmail.com",
        "IMAGE_URL": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
      }
    };
    let crewData = [{
      "name": 'Strings Attached',
      "decription": 'I started Strings Attached as a genre-blurring collaboration with folk artists. Our vision was to fuse jazz and classical flavors with the contemporary singer/songwriter genre; to dress it up with a little different jewelry. From the classical tradition we borrowed the architectural precision of composition and arranging. From jazz we brought the performance ethic. The ability to abandon the score and make choices spontaneously, in response to each other and the present musical moment. And then there\'s that irresistable sense of"swing" - the thing that gets people dancing.',
      "image": 'http://www.celebratewithstringsattached.com/western-swing.html'
    },
    {
      "name": "Zieme, Nitzsche and Murazik",
      "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
      "image": "http://dummyimage.com/201x122.jpg/ff4444/ffffff"
    }];
    this.state = {
      user: userData,
      userCrews: crewData
    }

    this.handleCrewClick = (val, e) => {
      e.preventDefault();
      console.log(val);
    }
  }

  render() {
    return (
      <div>

        <div className="sidebar-user-name">
        <h2>{this.state.user.facebook.DISPLAY_NAME} <Label>My Crews</Label></h2>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col>
              <h4>My Crews:</h4>
              <Nav bsStyle="pills" stacked>
                {this.state.userCrews.map((crew, key) => {
                  return (
                    <NavItem eventKey={key}
                      onClick={e => this.handleCrewClick(crew, e)} value={crew.name} key={key} className="sidebar-crew-name">
                      {crew.name}
                    </NavItem>
                  )
                })}

                <NavItem eventKey='createCrew'
                  onClick={e => this.handleCrewClick('createCrew', e)} value='createCrew' key='createCrew' className="sidebar-crew-name">
                  <strong>+ create crew</strong>
                </NavItem>
              </Nav>
              <hr />

              <h4>Top Members:</h4>
                <p>Lois Griffin</p>
                <p>Homer Simpson</p>
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
