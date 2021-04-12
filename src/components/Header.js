import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  // componentDidMount() {
  //   fetch("/user")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const { token } = data;
  //       localStorage.setItem("token", token);
  //     });
  // }
  render() {
    return (
      <div className="header">
        {window.location.pathname !== "/" ? (
          <Link to="/main">
            <h1 className="header__title">Gym's Tracker</h1>
          </Link>
        ) : (
          <Link to="/">
            <h1 className="header__title">Gym's Tracker</h1>
          </Link>
        )}
      </div>
    );
  }
}
export default Header;
