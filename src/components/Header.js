import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        {window.location.href === 'https://gyms-tracker.herokuapp.com/' ? <Link to="/"> <h1 className="header__title">Gym's Tracker</h1> </Link> :
        <Link to="/main">
          <h1 className="header__title">Gym's Tracker</h1>
        </Link>
        }
      </div>
    );
  }
}
export default Header;
