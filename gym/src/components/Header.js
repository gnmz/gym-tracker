import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/main">
          <button>Home</button>
        </Link>

        <h1>Gyms-Tracker</h1>
      </div>
    );
  }
}
export default Header;
