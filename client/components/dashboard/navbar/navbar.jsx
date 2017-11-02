import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    // notifications may go into dropdown

    // logout using App function that changes isLoggedIn state and removes jwt
    this.handleClickLogout = (e) => {
      e.preventDefault();
      this.props.changeLoginStatus();
    };

    // set state based on navbar search FormControl input
    this.handleSearchQuery = (e) => {
      this.setState({searchQuery: e.target.value});
    };

    // submit STRING search to dashboard function using state query, reset state query
    this.submitSearchField = () => {
      this.props.crewSearch(this.state.searchQuery);
      this.setState({searchQuery: ''});
    };

    // submit EMPTY search to dashboard function
    this.submitBrowse = () => {
      this.props.crewSearch('');
    };

  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/"><img className="navbar-logo" src="./images/logo.png" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <form>
                <FormGroup>
                  <FormControl type="text" placeholder="search" className="navbar-search-form"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchQuery}
                  />
                </FormGroup>
                <NavLink to="/dashboard/results">
                  <Button bsStyle="primary" type="submit" onClick={this.submitSearchField}><Glyphicon glyph="search" /> Search</Button>
                </NavLink>

                <NavLink to="/dashboard/results">
                  <Button type="submit" onClick={this.submitBrowse} className="navbar-browse-button">Browse</Button>
                </NavLink>
              </form>
            </Navbar.Form>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<img className="avatar" src={this.props.user.facebook.IMAGE_URL} height="30" width="30"/>} id="dropdown">
                <small> Logged in as {this.props.user.facebook.DISPLAY_NAME}</small>
                <MenuItem eventKey={1.1} onClick={this.handleClickLogout} className="navbar-logout">Logout <Glyphicon className="logout-glyph" glyph="off" /></MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

