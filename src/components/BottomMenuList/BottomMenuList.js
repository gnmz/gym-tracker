import React, { Component } from "react";
import {Link} from 'react-router-dom'

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import EditIcon from "@material-ui/icons/Edit";

import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


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
          <BottomNavigationAction component={Link} to='/main' icon={<HomeIcon />} />
          <BottomNavigationAction component={Link} to='/create-trainig-session' icon={<AddBoxIcon />} />
          <BottomNavigationAction component={Link} to='/train-history' icon={<RestoreIcon />} />
          <BottomNavigationAction component={Link} to='/edit-exercises' icon={<EditIcon />} />
          <BottomNavigationAction  component={Link} to='/' icon={<ExitToAppIcon />} onClick={this.logout} />

        </BottomNavigation>
      </div>
    );
  }
}

export default BottomMenuList;
