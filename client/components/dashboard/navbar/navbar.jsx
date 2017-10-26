import React, { Component } from 'react';

import Search from './search.jsx';
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
export default class NavBar extends Component {

  constructor(props) {
    super(props);
    // notifications may go into dropdown

    this.handleClickLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem('id_token');
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
             <Navbar.Brand>
              <a href="/">Crew</a>
             </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <Navbar.Form pullLeft>
                  <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                  </FormGroup>
                  <Button type="submit">Submit</Button>
                </Navbar.Form>
              </NavItem>
              <NavItem>
                <Navbar.Form pullLeft>
                  <Button type="submit">Browse</Button>
                </Navbar.Form>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<img className="avatar" src="https://avatars1.githubusercontent.com/u/15957141?s=40&amp;v=4" height="30" width="30"/>} id="dropdown">
                <MenuItem eventKey={1.1} onClick={this.handleClickLogout}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}





