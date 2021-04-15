import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import "./CreateTrainingSessionPageTitle.css";

export class CreateTrainingSessionPageTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <Typography className="create-train-page__title" variant="h2">
        {title}
      </Typography>
    );
  }
}

export default CreateTrainingSessionPageTitle;
