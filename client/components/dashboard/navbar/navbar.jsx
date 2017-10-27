import React, { Component } from 'react';

import createBrowserHistory from 'history/createBrowserHistory';
import { NavLink } from 'react-router-dom';

import Search from './search.jsx';
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
      localStorage.removeItem('id_token');
      // access BrowserRouter history
      const customHistory = createBrowserHistory();
      // push root '/' path and reload window
      customHistory.push('/');
      window.location.reload();
    };

    this.handleSearchQuery = (e) => {
      this.setState({searchQuery: e.target.value});
    };

    this.submitSearchField = () => {
      this.props.submitSearch(this.state.searchQuery);
      this.setState({searchQuery: ''});
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
                  <Button type="submit" onClick={this.props.browseSearch}>Browse</Button>
                </NavLink>
              </form>
            </Navbar.Form>
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<img className="avatar" src="https://avatars1.githubusercontent.com/u/15957141?s=40&amp;v=4" height="30" width="30"/>} id="dropdown">
                <p>Logged in as {this.props.user.facebook.DISPLAY_NAME}</p>
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