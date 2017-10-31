import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    // notifications may go into dropdown

    this.handleClickLogout = (e) => {
      e.preventDefault();
      this.props.changeLoginStatus();
    };

    this.handleSearchQuery = (e) => {
      this.setState({searchQuery: e.target.value});
    };

    this.submitSearchField = () => {
      this.props.crewSearch(this.state.searchQuery)
      this.setState({searchQuery: ''});
    };

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
              <a href="/">Crew</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <form>
                <FormGroup>
                  <FormControl type="text" placeholder="Search"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchQuery}
                  />
                </FormGroup>
                <NavLink to="/dashboard/results">
                  <Button type="submit" onClick={this.submitSearchField}>Search</Button>
                </NavLink>

                <NavLink to="/dashboard/results">
                  <Button type="submit" onClick={this.submitBrowse}>Browse</Button>
                </NavLink>
              </form>
            </Navbar.Form>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<img className="avatar" src={this.props.user.facebook.IMAGE_URL} height="30" width="30"/>} id="dropdown">
                <small>Logged in as {this.props.user.facebook.DISPLAY_NAME}</small>
                <MenuItem eventKey={1.1} onClick={this.handleClickLogout}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}







// <Navbar>
//           <Navbar.Header>
//              <Navbar.Brand>
//               <a href="/">Crew</a>
//              </Navbar.Brand>
//           </Navbar.Header>
//           <Navbar.Collapse>
//             <Nav>
//               <NavItem componentClass="span">
//                 <Navbar.Form pullLeft>
//                   <FormGroup>
//                     <FormControl type="text" placeholder="Search" />
//                   </FormGroup>
//                   <Button type="submit">Submit</Button>
//                 </Navbar.Form>
//               </NavItem>
//               <NavItem componentClass="span">
//                 <Navbar.Form pullLeft>
//                   <NavLink to="/dashboard/results">
//                     <Button type="submit" onClick={this.props.browseSearch}>Browse</Button>
//                   </NavLink>
//                 </Navbar.Form>
//               </NavItem>
//             </Nav>
//             <Nav pullRight>
//               <NavDropdown eventKey={1} title={<img className="avatar" src="https://avatars1.githubusercontent.com/u/15957141?s=40&amp;v=4" height="30" width="30"/>} id="dropdown">
//                 <MenuItem eventKey={1.1} onClick={this.handleClickLogout}>Logout</MenuItem>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>