import React, { Component } from "react";
import Categories from "../../components/EditExcersise/Categories";
import CreateCategories from "../../components/EditExcersise/CreateCategories";
import CreateExercise from "../../components/EditExcersise/CreateExercise";
import Exercises from "../../components/EditExcersise/Exercises";
import Logout from "../../components/Logout";

export class EditExcersise extends Component {
  state = {
    isCategory: false,
    isExercises: false,
    isCreateExercise: false,
    isCreateCategory: false,
  };

  chooseAction = (item) => {
    if (item === "categories") {
      this.setState({
        isCategory: true,
        isExercises: false,
        isCreateCategory: false,
        isCreateExercise: false,
      });
    } else if (item === "exercises") {
      this.setState({
        isCategory: false,
        isExercises: true,
        isCreateCategory: false,
        isCreateExercise: false,
      });
    } else if (item === "createCategory") {
      this.setState({
        isCategory: false,
        isExercises: false,
        isCreateCategory: true,
        isCreateExercise: false,
      });
    } else if (item === "createExercise") {
      this.setState({
        isCategory: false,
        isExercises: false,
        isCreateCategory: false,
        isCreateExercise: true,
      });
    }
  };

  render() {
    return (
      <div>
        <Logout history={this.props.history} />
        <h2>Настройки Упражнений</h2>
        <button
          onClick={() => {
            this.chooseAction("categories");
          }}
        >
          Категории
        </button>
        <button
          onClick={() => {
            this.chooseAction("exercises");
          }}
        >
          Упраженения
        </button>
        <button
          onClick={() => {
            this.chooseAction("createCategory");
          }}
        >
          Создать категорию
        </button>
        <button
          onClick={() => {
            this.chooseAction("createExercise");
          }}
        >
          Создать упражнение
        </button>
        {this.state.isCategory ? <Categories /> : null}
        {this.state.isExercises ? <Exercises /> : null}
        {this.state.isCreateCategory ? <CreateCategories /> : null}
        {this.state.isCreateExercise ? <CreateExercise /> : null}
      </div>
    );
  }
}

export default EditExcersise;
