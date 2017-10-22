import React, { Component } from 'react';

import Navbar from './navbar/navbar.jsx';
import Sidebar from './sidebar.jsx';
import Main from './main/main.jsx';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>DASHBOARD COMPONENT</p>
      </div>
    )
  }
}