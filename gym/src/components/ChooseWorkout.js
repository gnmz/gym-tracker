import React, { Component } from "react";

class ChooseWorkout extends Component {
  render() {
    const { workoutName, onClick } = this.props;
    return (
      <button className="workout-btn" onClick={onClick}>
        {workoutName}
      </button>
    );
  }
}

export default ChooseWorkout;
