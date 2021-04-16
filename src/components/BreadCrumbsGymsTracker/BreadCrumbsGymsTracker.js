import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import "./BreadCrumbsGymsTracker.css";

export class BreadCrumbsGymsTracker extends Component {
  render() {
    const { breadCrumb } = this.props;
    if (breadCrumb.length === 1) {
      return null;
    }
    if (breadCrumb.length > 1) {
      return (
        <div className="bread-crumbs">
          <Paper>
            <Breadcrumbs aria-label="Breadcrumb">
              {breadCrumb.map((item) => {
                if (item.id === breadCrumb.length) {
                  return (
                    <Typography color="textPrimary" key={item.id}>
                      {item.title}
                    </Typography>
                  );
                } else {
                  return (
                    <Link color="inherit" href={item.link} key={item.id}>
                      {item.title}
                    </Link>
                  );
                }
              })}
            </Breadcrumbs>
          </Paper>
        </div>
      );
    }
  }
}

export default BreadCrumbsGymsTracker;
