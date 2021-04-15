import React, { Component } from "react";

import CreateTrainingSessionPageTitle from "../CreateTrainingSessionPageTitle/CreateTrainingSessionPageTitle";

import DeleteIcon from "@material-ui/icons/Delete";
import "./CreateTrainingSessionTrainProgram.css";

export class CreateTrainingSessionTrainProgram extends Component {
  render() {
    const {
      createTrain,
      handleNumberRepetitions,
      handleworkingWeight,
      removeWorkout,
    } = this.props;
    return (
      <div className="create-train-program">
        <CreateTrainingSessionPageTitle title="Программа тренировки" />

        {createTrain.map((item) => (
          <div className="create-train-program-item" key={item.id}>
            <p className="create-train-program-item__title">
              {item.excersise_name}
            </p>
            {/* <button
              className="create-train-program-item__description-button"
              onClick={() => {
                this.showDescription(item.id);
              }}
            >
              ?
            </button> */}
            <label className="create-train-program-item__property">
              <input
                type="text"
                className="create-train-program-item__input"
                value={item.plan_rep ? item.plan_rep : ""}
                onChange={(e) => {
                  handleNumberRepetitions(item.id, e);
                }}
              />
              раз
            </label>
            <label className="create-train-program-item__property">
              <input
                type="text"
                className="create-train-program-item__input"
                value={item.plan_weight ? item.plan_weight : ""}
                onChange={(e) => {
                  handleworkingWeight(item.id, e);
                }}
              />
              кг
            </label>
            <button
              className="create-train-program-item__remove"
              onClick={() => {
                removeWorkout(item.id);
              }}
            >
              <DeleteIcon className="remove-icon"></DeleteIcon>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default CreateTrainingSessionTrainProgram;
