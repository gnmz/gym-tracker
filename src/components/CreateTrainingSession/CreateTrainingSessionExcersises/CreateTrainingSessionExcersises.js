import React, { Component } from "react";
import CreateTrainingSessionPageTitle from "../CreateTrainingSessionPageTitle/CreateTrainingSessionPageTitle";

import Button from "@material-ui/core/Button";
import "./CreateTrainingSessionExcersises.css";

export class CreateTrainingSessionExcersises extends Component {
  render() {
    const { exercisesList, addWorkout } = this.props;
    return (
      <div className="create-train-excersises">
        <CreateTrainingSessionPageTitle title="Выбери упражнение" />
        <div className="create-train-workout-list">
          {exercisesList.map((item) => (
            <Button
              color="primary"
              variant="outlined"
              key={item.id}
              className="create-train-workout-list__button"
              onClick={() => {
                addWorkout(item.title);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

export default CreateTrainingSessionExcersises;
