import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export class SignIn extends Component {
  render() {
    const {
      getUserLogin,
      getUserLoginValue,
      getUserPassword,
      getUserPasswordValue,
      authentication,
    } = this.props;
    return (
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoComplete="login"
          size="small"
          value={getUserLoginValue}
          onChange={getUserLogin}
          placeholder="demo"
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
          value={getUserPasswordValue}
          onChange={getUserPassword}
          placeholder="demo"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={authentication}
        >
          Sign In
        </Button>
      </div>
    );
  }
}

export default SignIn;
