import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <h1>Gyms-Tracker</h1>
        </Link>
      </div>
    );
  }
}
export default Header;
