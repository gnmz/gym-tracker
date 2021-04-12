import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class SingUp extends Component {
  render() {
    const {
      registerNewUser,
      getnewUserName,
      newUserName,
      getNewUserLogin,
      newUserLogin,
      getNewUserPassword,
      newUserPassword,
      getNewUserEmail,
      newUserEmail,
    } = this.props;
    return (
      <div>
        <TextField
          autoComplete="fname"
          margin="normal"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="Имя"
          autoFocus
          size="small"
          onChange={getnewUserName}
          value={newUserName}
        />
        <TextField
          autoComplete="login"
          margin="normal"
          name="login"
          variant="outlined"
          required
          fullWidth
          id="login"
          label="Логин"
          size="small"
          onChange={getNewUserLogin}
          value={newUserLogin}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          size="small"
          onChange={getNewUserPassword}
          value={newUserPassword}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          size="small"
          onChange={getNewUserEmail}
          value={newUserEmail}
        />

        <Button
          type="submit"
          margin="3"
          fullWidth
          variant="contained"
          color="primary"
          onClick={registerNewUser}
          disabled={!newUserLogin || !newUserPassword || !newUserEmail}
        >
          Зарегестрироваться
        </Button>
      </div>
    );
  }
}

export default SingUp;
