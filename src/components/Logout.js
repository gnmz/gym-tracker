import React, { Component } from "react";

class Logout extends Component {
  logout = () => {
    fetch("/logout", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.text())
      .then(() => {
        localStorage.removeItem("token");
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div className="logout">
        <button className="logout-btn" onClick={this.logout}>
          Выход
        </button>
      </div>
    );
  }
}

export default Logout;
