import React, { Component } from "react";
import ChooseWorkout from "../../components/ChooseWorkout";
import { Link } from "react-router-dom";
import "./CreateTrainigSession.css";
import DescriptionWindow from "../../components/DescriptionWindow";

class CreateTrainingSession extends Component {
  state = {
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
  };
  componentDidMount() {
    this.getCategoryOfExercises();
  }
  //получаем список категорий упражнений
  getCategoryOfExercises = () => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));
  };
  //получаем список упражнений по id категорий
  getExercisesList = (id) => {
    fetch(`/excersise?categoryId=${id}`)
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
  render() {
    const { description, showDescription, trainDate, trainName } = this.state;
    return (
      <div className="create-train-page">
        <h2 className="create-train-page__title">Запланируй тренировку</h2>
        <div className="create-train-page__properties">
          <label className="create-train-property">
            Дата тренировки
            <input
              className="create-train-property__input"
              type="text"
              placeholder="2020-05-09"
              value={trainDate}
              onChange={this.handleDate}
            />
          </label>
          <label className="create-train-property">
            Название тренировки
            <input
              className="create-train-property__input"
              type="text"
              value={trainName}
              onChange={this.handleTrainName}
            />
          </label>
        </div>
        <h2 className="create-train-page__title">Выбери категорию</h2>
        <div className="create-train-workout-list">
          {this.state.categoryOfExercises.map((item) => (
            <ChooseWorkout
              key={item.id}
              workoutName={item.title}
              onClick={() => {
                this.getExercisesList(item.id);
              }}
            />
          ))}
        </div>

        {this.state.exercisesList.length ? (
          <div className="create-train-excersises">
            <h2 className="create-train-page__title">Выбери упражнение</h2>
            <div className="create-train-workout-list">
              {this.state.exercisesList.map((item) => (
                <button
                  key={item.id}
                  className="create-train-workout-list__button"
                  onClick={() => {
                    this.addWorkout(item.title);
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {this.state.createTrain.length ? (
          <div className="create-train-program">
            <h2 className="create-train-page__title">Программа тренировки</h2>
            {this.state.createTrain.map((item) => (
              <div className="create-train-program-item" key={item.id}>
                <p className="create-train-program-item__title">
                  {item.excersise_name}
                </p>
                <button
                  className="create-train-program-item__description-button"
                  onClick={() => {
                    this.showDescription(item.id);
                  }}
                >
                  ?
                </button>
                <label className="create-train-program-item__property">
                  <input
                    type="text"
                    className="create-train-program-item__input"
                    value={item.plan_rep ? item.plan_rep : ""}
                    onChange={(e) => {
                      this.handleNumberRepetitions(item.id, e);
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
                      this.handleworkingWeight(item.id, e);
                    }}
                  />
                  кг
                </label>
                <button
                  className="create-train-program-item__remove"
                  onClick={() => {
                    this.removeWorkout(item.id);
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
        ) : null}

        {this.state.createTrain.length && trainName && trainDate ? (
          !this.state.isClicked ? (
            <button
              className="create-train-program__save"
              onClick={this.recordTrain}
            >
              Сохранить
            </button>
          ) : (
            <Link to="/main">Перейти к тренировкам</Link>
          )
        ) : null}
        {showDescription ? (
          <DescriptionWindow
            title={description.excersise_name}
            description={description.description}
            onClick={this.closeDescription}
          />
        ) : null}
      </div>
    );
  }
}
export default CreateTrainingSession;
