import React, { Component } from "react";
import Logout from "./Logout/Logout";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Logout />
        <h1 className="header__title">Gym's Tracker</h1>
      </div>
    );
  }
}
export default Header;
