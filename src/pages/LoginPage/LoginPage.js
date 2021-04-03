import React, { Component } from "react";
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    enter: true,
    user_login: "",
    user_password: "",
    newUserName: "",
    newUserSurName: "",
    newUserLogin: "",
    newUserPassword: "",
    newUserEmail: "",
    newUser: [],
    user: [],
    errorLoginMessage: "",
  };
  componentDidMount() {
    this.setState({ enter: true });
  }
  clickerHandler = (item) => {
    if (item === "aut") {
      this.setState({ enter: true });
    } else if (item === "reg") {
      this.setState({ enter: false });
    }
  };
  getUserLogin = (e) => {
    this.setState({ user_login: e.target.value });
  };
  getUserPassword = (e) => {
    this.setState({ user_password: e.target.value });
  };
  getnewUserName = (e) => {
    this.setState({ newUserName: e.target.value });
  };
  getnewUserSurName = (e) => {
    this.setState({ newUserSurName: e.target.value });
  };
  getNewUserLogin = (e) => {
    this.setState({ newUserLogin: e.target.value });
  };
  getNewUserPassword = (e) => {
    this.setState({ newUserPassword: e.target.value });
  };
  getNewUserEmail = (e) => {
    this.setState({ newUserEmail: e.target.value });
  };
  registerNewUser = () => {
    const {
      newUserName,
      newUserLogin,
      newUserPassword,
      newUserEmail,
    } = this.state;
    this.setState(
      {
        newUser: {
          user_name: newUserName,
          user_login: newUserLogin,
          user_password: newUserPassword,
          user_email: newUserEmail,
        },
      },
      () => {
        fetch(`http://localhost:3001/reg`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.state.newUser),
        });
      }
    );
  };
  authentication = (login, psw) => {
    this.setState(
      {
        user: {
          user_login: login,
          user_password: psw,
        },
      },
      () => {
        fetch(`http://localhost:3001/auth`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.state.user),
        })
          .then((res) => {
            if (res.status === 401) {
              this.props.history.push("/");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data === undefined) {
              alert("Введите повтороно логин и пароль");
            } else {
              const { token } = data;
              localStorage.setItem("token", token);
              this.props.history.push("/main");
            }
          });
      }
    );
  };

  render() {
    const {
      enter,
      user_login,
      user_password,
      newUserName,
      newUserLogin,
      newUserPassword,
      newUserEmail,
    } = this.state;
    return (
      <div className="auth">
        {enter ? (
          <div className="auth-choose-action">
            <span
              onClick={() => {
                this.clickerHandler("aut");
              }}
              className="auth-choose-action__button active"
            >
              Вход
            </span>
            <span
              onClick={() => {
                this.clickerHandler("reg");
              }}
              className="auth-choose-action__button default"
            >
              Регистрация
            </span>
          </div>
        ) : (
          <div className="auth-choose-action">
            <span
              onClick={() => {
                this.clickerHandler("aut");
              }}
              className="auth-choose-action__button default"
            >
              Вход
            </span>
            <span
              onClick={() => {
                this.clickerHandler("reg");
              }}
              className="auth-choose-action__button active"
            >
              Регистрация
            </span>
          </div>
        )}
        {enter ? (
          <div>
            <div>
              <div className="auth-form-item">
                <label className="auth-form-item__title">Login:</label>
                <div>
                  <input
                    type="text"
                    placeholder="demo"
                    className="auth-form-item__input"
                    onChange={this.getUserLogin}
                    value={user_login}
                  />
                </div>
              </div>
              <div className="auth-form-item">
                <label className="auth-form-item__title">Password:</label>
                <div>
                  <input
                    type="password"
                    placeholder="demo"
                    className="auth-form-item__input"
                    onChange={this.getUserPassword}
                    value={user_password}
                  />
                </div>
              </div>
              <button
                className="auth-form-btn"
                onClick={() => {
                  this.authentication(user_login, user_password);
                }}
                disabled={!user_login || !user_password}
              >
                Вход
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="auth-form-item">
                <label className="auth-form-item__title">Имя:</label>
                <div>
                  <input
                    type="text"
                    className="auth-form-item__input"
                    onChange={this.getnewUserName}
                    value={newUserName}
                  />
                </div>
              </div>
              {/* <div className="auth-form-item">
                <label className="auth-form-item__title">Фамилия:</label>
                <div>
                  <input
                    type="text"
                    className="auth-form-item__input"
                    onChange={this.getnewUserSurName}
                    value={newUserSurName}
                  />
                </div>
              </div> */}
              <div className="auth-form-item">
                <label className="auth-form-item__title">Login:</label>
                <div>
                  <input
                    type="text"
                    className="auth-form-item__input"
                    onChange={this.getNewUserLogin}
                    value={newUserLogin}
                  />
                </div>
                {this.state.errorLoginMessage}
              </div>
              <div className="auth-form-item">
                <label className="auth-form-item__title">Password:</label>
                <div>
                  <input
                    type="password"
                    className="auth-form-item__input"
                    onChange={this.getNewUserPassword}
                    value={newUserPassword}
                  />
                </div>
              </div>
              <div className="auth-form-item">
                <label className="auth-form-item__title">E-mail:</label>
                <div>
                  <input
                    type="text"
                    className="auth-form-item__input"
                    onChange={this.getNewUserEmail}
                    value={newUserEmail}
                  />
                </div>
              </div>
            </div>
            <button
              className="auth-form-btn"
              onClick={this.registerNewUser}
              disabled={!newUserLogin || !newUserPassword || !newUserEmail}
            >
              Зарегестрироваться
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
