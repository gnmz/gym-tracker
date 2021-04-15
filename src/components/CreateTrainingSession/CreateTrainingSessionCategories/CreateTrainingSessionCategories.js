import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./CreateTrainingSessionCategories.css";

export class CreateTrainingSessionCategories extends Component {
  state = {
    chooseAction: "",
  };
  chooseAction = (id, name) => {
    const {
      categoryOfExercises,
      getExercisesList,
      isCustomExercises,
      getCustomExercisesList,
    } = this.props;
    let match = categoryOfExercises.find((item) => {
      return item.title === name;
    });
    let chooseName = match.title;
    this.setState({ chooseAction: chooseName });
    if (isCustomExercises) {
      getExercisesList(id);
    } else {
      getCustomExercisesList(id);
    }
  };
  actionClass = (title) => {
    if (title === this.state.chooseAction) {
      return "contained";
    } else {
      return "outlined";
    }
  };
  render() {
    const { categoryOfExercises } = this.props;
    return (
      <div className="create-train-workout-list">
        {categoryOfExercises.map((item) => (
          <Button
            className="create-train-workout-list__item"
            variant={this.actionClass(item.title)}
            color="primary"
            key={item.id}
            onClick={() => {
              this.chooseAction(item.id, item.title);
            }}
          >
            {item.title}
          </Button>
        ))}
      </div>
    );
  }
}

export default CreateTrainingSessionCategories;
