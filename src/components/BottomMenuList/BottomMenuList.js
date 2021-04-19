import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import EditIcon from "@material-ui/icons/Edit";

import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";

import "./BottomMenuList.css";

export class BottomMenuList extends Component {
  logout = () => {
    fetch("/logout", {
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
      <div className="bottom-navigation">
        <BottomNavigation showLabels={false}>
          <Link href="/main">
            <BottomNavigationAction icon={<HomeIcon />} />
          </Link>

          <Link href="/create-trainig-session">
            <BottomNavigationAction icon={<AddBoxIcon />} />
          </Link>

          <Link href="/train-history">
            <BottomNavigationAction icon={<RestoreIcon />} />
          </Link>

          <Link href="/edit-exercises">
            <BottomNavigationAction icon={<EditIcon />} />
          </Link>

          <Link onClick={this.logout} href="/">
            <BottomNavigationAction icon={<ExitToAppIcon />} />
          </Link>
        </BottomNavigation>
      </div>
    );
  }
}

export default BottomMenuList;
