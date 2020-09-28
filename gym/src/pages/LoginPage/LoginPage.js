import React, { Component } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
class LoginPage extends Component {
  state = {
    login: "",
    password: "",
    correctData: false,
  };
  isLogin = (e) => {
    this.setState({ login: e.target.value });
    console.log(this.state.login);
  };
  isPassword = (e) => {
    this.setState({ password: e.target.value });
  };
  authentication = (a, b) => {
    if (a === "test" && b === "123") {
      return true;
    }
  };
  render() {
    const { login, password } = this.state;
    return (
      <div className="login-form">
        <label>
          <span>Логин:</span>
          <input type="text" value={login} onChange={this.isLogin} />
        </label>
        <label>
          Пароль:
          <input type="text" value={password} onChange={this.isPassword} />
        </label>
        <Link to={"/main"} className="link-to-main">
          <button
            className="entr-btn"
            disabled={!this.authentication(login, password)}
          >
            Вход
          </button>
        </Link>
      </div>
    );
  }
}

export default LoginPage;
