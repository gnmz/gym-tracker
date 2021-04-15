import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./CreateTrainingSessionActions.css";

export class CreateTrainingSessionActions extends Component {
  state = {
    isClickeDefaultCategory: false,
    isClickeCustomtCategory: false,
  };

  chooseActionClass = (item) => {
    const { isClickeDefaultCategory, isClickeCustomtCategory } = this.state;
    if (isClickeDefaultCategory && item === "Готовые категории") {
      return "contained";
    }
    if (isClickeCustomtCategory && item === "Свои категории") {
      return "contained";
    } else {
      return "outlined";
    }
  };

  chooseAction = (item) => {
    const { getCategoryOfExercises, getCustomCategoryOfExercises } = this.props;
    if (item === "Готовые категории") {
      this.setState(
        { isClickeDefaultCategory: true, isClickeCustomtCategory: false },
        getCategoryOfExercises()
      );
    } else if (item === "Свои категории") {
      this.setState(
        { isClickeCustomtCategory: true, isClickeDefaultCategory: false },
        getCustomCategoryOfExercises()
      );
    }
  };

  render() {
    return (
      <div>
        <h2 className="create-train-page__title">Выбери набор категорий</h2>
        <div className="create-train-program__actions">
          <Button
            variant={this.chooseActionClass("Готовые категории")}
            color="primary"
            onClick={() => {
              this.chooseAction("Готовые категории");
            }}
            className="create-train-program__save"
          >
            Готовые категории
          </Button>
          <Button
            variant={this.chooseActionClass("Свои категории")}
            color="primary"
            className="create-train-program__save"
            onClick={() => {
              this.chooseAction("Свои категории");
            }}
          >
            Свои категории
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateTrainingSessionActions;
