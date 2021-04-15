import React, { Component } from "react";

import Button from "@material-ui/core/Button";

class ChooseWorkout extends Component {
  render() {
    const { workoutName, onClick } = this.props;
    return (
      <Button
        color="primary"
        variant="outlined"
        className="create-train-workout-list__button"
        onClick={onClick}
      >
        {workoutName}
      </Button>
    );
  }
}

export default ChooseWorkout;
