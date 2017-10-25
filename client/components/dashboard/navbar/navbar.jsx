import React, { Component } from 'react';

import Search from './search.jsx';
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
export default class NavBar extends Component {

  constructor(props) {
    super(props);
    // notifications may go into dropdown
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
             <Navbar.Brand>
              <a href="#">Crew</a>
             </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Navbar.Form>
            </Nav>
            <Nav>
              <Navbar.Form pullLeft>
                <Button type="submit">Browse</Button>
              </Navbar.Form>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="More" id="dropdown">
                <MenuItem eventKey={1.1}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}