import React, { Component } from "react";
import "./LoginPage.css";
import SignIn from "../../components/SignIn";
import SingUp from "../../components/SingUp";
import Button from "@material-ui/core/Button";

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
    console.log(user_login, user_password);
    return (
      <div className="auth">
        {enter ? (
          <div className="auth-choose-action">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.clickerHandler("aut");
              }}
            >
              Вход
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                this.clickerHandler("reg");
              }}
            >
              Регистрация
            </Button>
          </div>
        ) : (
          <div className="auth-choose-action">
            <Button
              onClick={() => {
                this.clickerHandler("aut");
              }}
              variant="outlined"
              color="primary"
            >
              Вход
            </Button>
            <Button
              onClick={() => {
                this.clickerHandler("reg");
              }}
              variant="contained"
              color="primary"
            >
              Регистрация
            </Button>
          </div>
        )}
        {enter ? (
          <SignIn
            getUserLogin={this.getUserLogin}
            getUserLoginValue={user_login}
            getUserPassword={this.getUserPassword}
            getUserPasswordValue={user_password}
            authentication={() => {
              this.authentication(user_login, user_password);
            }}
          />
        ) : (
          <SingUp
            registerNewUser={this.registerNewUser}
            getnewUserName={this.getnewUserName}
            newUserName={newUserName}
            getNewUserLogin={this.getNewUserLogin}
            newUserLogin={newUserLogin}
            getNewUserPassword={this.getNewUserPassword}
            newUserPassword={newUserPassword}
            getNewUserEmail={this.getNewUserEmail}
            newUserEmail={newUserEmail}
          />
        )}
      </div>
    );
  }
}

export default LoginPage;
