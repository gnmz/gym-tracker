import React, { Component } from "react";

import CreateTrainingSessionActions from "../../components/CreateTrainingSession/CreateTrainingSessionActions/CreateTrainingSessionActions";
import DescriptionWindow from "../../components/DescriptionWindow";
import CreateTrainingSessionCategories from "../../components/CreateTrainingSession/CreateTrainingSessionCategories/CreateTrainingSessionCategories";
import CreateTrainingSessionProperties from "../../components/CreateTrainingSession/CreateTrainingSessionProperties/CreateTrainingSessionProperties";
import CreateTrainingSessionPageTitle from "../../components/CreateTrainingSession/CreateTrainingSessionPageTitle/CreateTrainingSessionPageTitle";
import CreateTrainingSessionExcersises from "../../components/CreateTrainingSession/CreateTrainingSessionExcersises/CreateTrainingSessionExcersises";
import CreateTrainigSessionSavedTrain from "../../components/CreateTrainingSession/CreateTrainigSessionSavedTrain/CreateTrainigSessionSavedTrain";

import "./CreateTrainigSession.css";
import { CreateTrainingSessionTrainProgram } from "../../components/CreateTrainingSession/CreateTrainingSessionTrainProgram/CreateTrainingSessionTrainProgram";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";
import Header from "../../components/Header";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";
import BottomMenuList from "../../components/BottomMenuList/BottomMenuList";

class CreateTrainingSession extends Component {
  state = {
    sidebarItemActive: "create train",
    categoryOfExercises: [],
    exercisesList: [],
    createTrain: [],
    savedTrain: [],
    trainDate: "",
    trainName: "",
    numberOfExercises: 1,
    isClicked: false,
    showDescription: false,
    description: "",
    isCustomExercises: false,
    currentDate: new Date(),
    isClickedCurrentDate: false,
    createTrainingSessionPage: [
      { id: 1, title: "Главная", link: "/main" },
      { id: 2, title: "Создание тренировки" },
    ],
  };
  componentDidMount() {
    this.changeDateFormat(this.state.currentDate);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentDate !== prevState.currentDate) {
      this.changeDateFormat(this.state.currentDate);
    }
  }

  componentWillUnmount() {
    this.changeDateFormat();
  }

  //получаем список категорий упражнений
  getCategoryOfExercises = () => {
    const { isCustomExercises, categoryOfExercises } = this.state;
    if (!isCustomExercises || categoryOfExercises.length <= 0) {
      this.setState({ isCustomExercises: true, exercisesList: [] }, () => {
        fetch("/categories")
          .then((res) => res.json())
          .then((data) => this.setState({ categoryOfExercises: data }));
      });
    }
  };
  //получаем список упражнений по id категорий
  getExercisesList = (id) => {
    fetch(`/excersise?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  };

  //Получаем список кастомных категорий
  getCustomCategoryOfExercises = () => {
    const { isCustomExercises, categoryOfExercises } = this.state;
    if (isCustomExercises || categoryOfExercises.length <= 0) {
      this.setState({ isCustomExercises: false, exercisesList: [] }, () => {
        fetch("/custom-categories", {
          headers: { token: localStorage.getItem("token") },
        })
          .then((res) => res.json())
          .then((data) => this.setState({ categoryOfExercises: data }));
      });
    }
  };

  getCustomExercisesList = (id) => {
    fetch(`/custom-excersises?categoryId=${id}`, {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  };
  //добавляем упражнение
  addWorkout = (title) => {
    const newArr = [...this.state.createTrain];
    this.setState({ numberOfExercises: this.state.numberOfExercises + 1 });
    newArr.push({
      id: this.state.numberOfExercises,
      excersise_name: title,
      plan_rep: "",
      plan_weight: "",
      fact_rep: "",
      fact_weight: "",
      description: "",
    });
    this.setState({
      createTrain: newArr,
    });
  };
  //сохраняем тренировку
  recordTrain = () => {
    this.setState(
      {
        savedTrain: {
          date: this.state.trainDate,
          title: this.state.trainName,
          excersises: JSON.stringify(this.state.createTrain),
          comment: "",
          is_completed: false,
        },
        isClicked: true,
      },
      () => {
        fetch(`/trains`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(this.state.savedTrain),
        });
      }
    );
  };

  //Изменение даты в формат YYYY-MM-DD

  changeDateFormat = (date) => {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1;
    let day = new Date(date).getDate();
    if (month < 10 && day < 10) {
      this.setState({ trainDate: `${year}-0${month}-0${day}` });
    }
    if (month < 10) {
      this.setState({ trainDate: `${year}-0${month}-${day}` });
    }
    if (day < 10) {
      this.setState({ trainDate: `${year}-${month}-0${day}` });
    }
    if (month > 10 && day > 10) {
      this.setState({ trainDate: `${year}-${month}-${day}` });
    }
  };

  //получаем значение из инпута повторений
  handleNumberRepetitions = (id, e) => {
    const value = e.target.value;
    const updatedExcercises = this.state.createTrain.map((item) => {
      if (item.id === id) {
        item.plan_rep = value;
      }
      return item;
    });
    this.setState({
      plan_rep: updatedExcercises.plan_rep,
    });
  };
  //получаем значение из инпута рабочего веса
  handleworkingWeight = (id, e) => {
    const value = e.target.value;
    const updatedExcercises = this.state.createTrain.map((item) => {
      if (item.id === id) {
        item.plan_weight = value;
      }
      return item;
    });
    this.setState({ plan_weight: updatedExcercises.plan_weight });
  };
  //добавление даты
  handleDate = (e) => {
    this.setState({ trainDate: e.target.value });
  };
  //добавление названия тренировки
  handleTrainName = (e) => {
    this.setState({ trainName: e.target.value });
  };
  //удаляем упражнение из тренировки
  removeWorkout = (id) => {
    const newArr = this.state.createTrain.filter((item) => {
      return item.id !== id;
    });
    this.setState({ createTrain: newArr });
  };
  //Показываем описание упражнения
  showDescription = (id) => {
    const newArr = this.state.createTrain.find((item) => {
      return item.id === id;
    });
    if (newArr) {
      this.setState({ showDescription: true, description: newArr });
    }
  };
  //Убираем описание упражнения
  closeDescription = () => {
    const { showDescription } = this.state;
    if (showDescription) {
      this.setState({ showDescription: false });
    }
  };

  handleDateChange = (date) => {
    this.setState({ currentDate: date });
  };

  render() {
    const {
      description,
      showDescription,
      trainDate,
      trainName,
      currentDate,
    } = this.state;
    return (
      <>
        <BottomMenuList />
        <div className="create-train-page">
          <Header />
          <BreadCrumbsGymsTracker
            breadCrumb={this.state.createTrainingSessionPage}
          />
          <div className="create-train-page__wrapper">
            <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
            <div className="create-train-page__wrapper-block">
              <CreateTrainingSessionPageTitle title="Запланируй тренировку" />
              <CreateTrainingSessionProperties
                currentDate={currentDate}
                handleDateChange={this.handleDateChange}
                trainName={trainName}
                handleTrainName={this.handleTrainName}
              />

              <CreateTrainingSessionActions
                getCategoryOfExercises={this.getCategoryOfExercises}
                getCustomCategoryOfExercises={this.getCustomCategoryOfExercises}
              />
              {this.state.categoryOfExercises.length <= 0 ? null : (
                <CreateTrainingSessionPageTitle title="Выбери категорию" />
              )}
              <CreateTrainingSessionCategories
                categoryOfExercises={this.state.categoryOfExercises}
                isCustomExercises={this.state.isCustomExercises}
                getCustomExercisesList={this.getCustomExercisesList}
                getExercisesList={this.getExercisesList}
              />

              {this.state.exercisesList.length ? (
                <CreateTrainingSessionExcersises
                  exercisesList={this.state.exercisesList}
                  addWorkout={this.addWorkout}
                />
              ) : null}

              {this.state.createTrain.length ? (
                <CreateTrainingSessionTrainProgram
                  createTrain={this.state.createTrain}
                  handleNumberRepetitions={this.handleNumberRepetitions}
                  handleworkingWeight={this.handleworkingWeight}
                  removeWorkout={this.removeWorkout}
                />
              ) : null}
              {this.state.createTrain.length && trainName && trainDate ? (
                <CreateTrainigSessionSavedTrain
                  isClicked={this.state.isClicked}
                  recordTrain={this.recordTrain}
                />
              ) : null}

              {showDescription ? (
                <DescriptionWindow
                  title={description.excersise_name}
                  description={description.description}
                  onClick={this.closeDescription}
                />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CreateTrainingSession;
