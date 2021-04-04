import React, { Component } from "react";
import Categories from "../../components/EditExcersise/Categories";
import CreateCategories from "../../components/EditExcersise/CreateCategories";
import CreateExercise from "../../components/EditExcersise/CreateExercise";
import Exercises from "../../components/EditExcersise/Exercises";
import Logout from "../../components/Logout";

import "./EditExcersise.css";

export class EditExcersise extends Component {
  state = {
    isCategory: false,
    isExercises: false,
    isCreateExercise: false,
    isCreateCategory: false,
    categoryOfExercises: [],
    exercisesList: [],
    newCategoryOfExercises: null,
    menuList: [
      { id: 1, title: "Категории" },
      { id: 2, title: "Упражнения" },
      { id: 3, title: "Создать категорию" },
      { id: 4, title: "Создать упражнение" },
    ],
  };
  componentDidMount() {
    fetch("http://localhost:3001/custom-categories", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));

    fetch("http://localhost:3001/custom-excersises", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  }

  chooseAction = (item) => {
    if (item === "Категории") {
      this.setState({
        isCategory: true,
        isExercises: false,
        isCreateCategory: false,
        isCreateExercise: false,
      });
    } else if (item === "Упражнения") {
      this.setState({
        isCategory: false,
        isExercises: true,
        isCreateCategory: false,
        isCreateExercise: false,
      });
    } else if (item === "Создать категорию") {
      this.setState({
        isCategory: false,
        isExercises: false,
        isCreateCategory: true,
        isCreateExercise: false,
      });
    } else if (item === "Создать упражнение") {
      this.setState({
        isCategory: false,
        isExercises: false,
        isCreateCategory: false,
        isCreateExercise: true,
      });
    }
  };

  chooseActionClass = (item) => {
    const {
      isCategory,
      isExercises,
      isCreateCategory,
      isCreateExercise,
    } = this.state;
    if (isCategory && item === "Категории") {
      return "exercise-settings-list__item  exercise-settings-list__item-active";
    } else if (isExercises && item === "Упражнения") {
      return "exercise-settings-list__item  exercise-settings-list__item-active";
    } else if (isCreateCategory && item === "Создать категорию") {
      return "exercise-settings-list__item  exercise-settings-list__item-active";
    } else if (isCreateExercise && item === "Создать упражнение") {
      return "exercise-settings-list__item  exercise-settings-list__item-active";
    } else {
      return "exercise-settings-list__item";
    }
  };

  getNewCategoriesList = (item) => {
    this.setState({ newCategoryOfExercises: item });
  };

  render() {
    const {
      categoryOfExercises,
      exercisesList,
      menuList,
      newCategoryOfExercises,
    } = this.state;
    return (
      <div className="exercise-settings">
        <Logout history={this.props.history} />
        <h2 className="exercise-settings__title">Настройки Упражнений</h2>
        <ul className="exercise-settings-list">
          {menuList.map((item) => (
            <li
              className={this.chooseActionClass(item.title)}
              key={item.id}
              onClick={() => {
                this.chooseAction(item.title);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
        {this.state.isCategory ? (
          <Categories categoryOfExercises={categoryOfExercises} />
        ) : null}
        {this.state.isExercises ? (
          <Exercises exercisesList={exercisesList} />
        ) : null}
        {this.state.isCreateCategory ? (
          <CreateCategories
            getNewCategoriesList={this.getNewCategoriesList}
            newCategoryOfExercises={newCategoryOfExercises}
          />
        ) : null}
        {this.state.isCreateExercise ? <CreateExercise /> : null}
      </div>
    );
  }
}

export default EditExcersise;
