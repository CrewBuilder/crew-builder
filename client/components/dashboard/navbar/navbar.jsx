import React, { Component } from 'react';

import Search from './search.jsx';
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
export default class NavBar extends Component {

  constructor(props) {
    super(props);
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
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Navbar.Form>
          <Navbar.Form>
            <Button type="submit">Browse</Button>
          </Navbar.Form>
        </Navbar>
      </div>
    )
  }
}