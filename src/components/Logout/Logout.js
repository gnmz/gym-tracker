import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Logout.css";

class Logout extends Component {
  state = {
    isLogged: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLogged !== prevState.isLogged) {
      this.setState({ isLogged: false });
    }
  }

  logout = () => {
    fetch("http://localhost:3001/logout", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.text())
      .then(() => {
        localStorage.removeItem("token");
        // this.props.history.push("/");
      });
    this.setState({ isLogged: true });
  };
  render() {
    return (
      <div className="logout">
        <button className="logout-btn" onClick={this.logout}>
          Выход
        </button>
        {this.state.isLogged ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default Logout;
