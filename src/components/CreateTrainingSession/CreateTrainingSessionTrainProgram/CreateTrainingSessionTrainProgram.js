import React, { Component } from "react";

import CreateTrainingSessionPageTitle from "../CreateTrainingSessionPageTitle/CreateTrainingSessionPageTitle";

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
              удалить
            </button>
            <button
              className="create-train-program-item__remove-altr"
              onClick={() => {
                this.removeWorkout(item.id);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default CreateTrainingSessionTrainProgram;
