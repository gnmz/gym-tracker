import React, { Component } from "react";
import Categories from "../../components/EditExcersise/Categories/Categories";
import CreateCategories from "../../components/EditExcersise/CreateCategories";
import CreateExercise from "../../components/EditExcersise/CreateExercise";
import Exercises from "../../components/EditExcersise/Exercises/Exercises";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";
import Header from "../../components/Header";
import "./EditExcersise.css";
import BottomMenuList from "../../components/BottomMenuList/BottomMenuList";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export class EditExcersise extends Component {
  state = {
    sidebarItemActive: "edit",
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
    categoryAndExercises: [],
    isGetAllCategories: false,
    isGetAllExcersises: false,
    isGetFullData: false,
    editExcersisePage: [
      { id: 1, title: "Главная", link: "/main" },
      { id: 2, title: "Настройка упражнений" },
    ],
  };
  componentDidMount() {
    this.getAllCategories();
    this.getFullData();
  }

  componentWillUnmount() {
    this.getAllCategories();
    this.getFullData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isGetAllCategories !== prevState.isGetAllCategories) {
      this.getAllCategories();
      this.getFullData();
      this.setState({ isGetAllCategories: false });
    }
    if (this.state.isGetFullData !== prevState.isGetFullData) {
      this.getFullData();
      this.setState({ isGetFullData: false });
    }
  }

  getAllCategories = () => {
    fetch("/custom-categories", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));
  };

  getFullData = () => {
    fetch(`/custom-categories-all`, {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categoryAndExercises: data }));
  };

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
    const { isCategory, isExercises, isCreateCategory, isCreateExercise } =
      this.state;
    if (isCategory && item === "Категории") {
      return "contained";
    } else if (isExercises && item === "Упражнения") {
      return "contained";
    } else if (isCreateCategory && item === "Создать категорию") {
      return "contained";
    } else if (isCreateExercise && item === "Создать упражнение") {
      return "contained";
    } else {
      return "outlined";
    }
  };

  isGetAllCategories = (item) => {
    this.setState({ isGetAllCategories: item });
  };

  isGetAllExcersises = (item) => {
    this.setState({ isGetAllExcersises: item });
  };

  isGetFullData = (item) => {
    this.setState({ isGetFullData: item });
  };

  render() {
    const {
      categoryOfExercises,
      categoryAndExercises,
      menuList,
      newCategoryOfExercises,
    } = this.state;

    return (
      <div className="edit-exercise-page">
        <BottomMenuList />
        <Header />
        <BreadCrumbsGymsTracker breadCrumb={this.state.editExcersisePage} />
        <div className="exercise-settings-wrapper">
          <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
          <div className="exercise-settings-wrapper__content">
            <div className="exercise-settings">
              <h2 className="exercise-settings__title">Настройка Упражнений</h2>
              <ButtonGroup
                className="exercise-settings-list"
                color="primary"
                aria-label="outlined primary button group"
              >
                {menuList.map((item) => (
                  <Button
                    variant={this.chooseActionClass(item.title)}
                    className="choose-settings-btn"
                    key={item.id}
                    onClick={() => {
                      this.chooseAction(item.title);
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </ButtonGroup>
              {this.state.isCategory ? (
                <Categories
                  categoryOfExercises={categoryOfExercises}
                  isLoading={this.isGetAllCategories}
                />
              ) : null}
              {this.state.isExercises ? (
                <Exercises
                  categoryAndExercises={categoryAndExercises}
                  isLoading={this.isGetFullData}
                />
              ) : null}
              {this.state.isCreateCategory ? (
                <CreateCategories
                  newCategoryOfExercises={newCategoryOfExercises}
                  isLoading={this.isGetAllCategories}
                />
              ) : null}
              {this.state.isCreateExercise ? (
                <CreateExercise
                  categoryOfExercises={categoryOfExercises}
                  isLoading={this.isGetAllCategories}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditExcersise;
