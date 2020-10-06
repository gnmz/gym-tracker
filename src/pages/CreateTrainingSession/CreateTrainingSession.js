import React, { Component } from "react";
import ChooseWorkout from "../../components/ChooseWorkout";
import "./CreateTrainigSession.css";
class CreateTrainingSession extends Component {
  state = {
    categoryOfExercises: [],
    exercisesList: [],
    createTrain: [],
    savedTrain: [],
    trainDate: "",
    trainName: "",
    numberOfExercises: 1,
  };
  componentDidMount() {
    this.getCategoryOfExercises();
  }
  componentDidUpdate() {}
  //получаем список категорий упражнений
  getCategoryOfExercises = () => {
    const URL = "http://localhost:3001/categories";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));
  };
  //получаем список упражнений по id категорий
  getExercisesList = (id) => {
    const URL = `http://localhost:3001/excersise?categoryId=${id}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  };
  //добавляем упражнение
  addWorkout = (title) => {
    const newArr = [...this.state.createTrain];
    newArr.push({
      id: this.state.numberOfExercises++,
      excersise_name: title,
      plan_rep: "",
      plan_weight: "",
      fact_rep: "",
      fact_weight: "",
    });
    this.setState({
      createTrain: newArr,
    });
  };
  //сохраняем тренировку
  clickSaveTrain = () => {
    this.setState({
      savedTrain: {
        date: this.state.trainDate,
        title: this.state.trainName,
        excersises: JSON.stringify(this.state.createTrain),
        comment: "",
        is_completed: false,
      },
    }, () => {
      fetch(`http://localhost:3001/trains`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state.savedTrain),
      });
    });
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
    if (e.target.value === "") {
      let now = new Date();
      let date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      this.setState({ trainDate: date });
    } else {
      this.setState({ trainDate: e.target.value });
    }
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
  render() {
    return (
      <div>
        <h2>Создай тренировку</h2>
        <div>
          <label>
            Дата тренировки
            <input
              type="text"
              value={this.state.trainDate}
              onChange={this.handleDate}
            />
          </label>
          <label>
            Название тренировки
            <input
              type="text"
              value={this.state.trainName}
              onChange={this.handleTrainName}
            />
          </label>
        </div>
        <div className="workout-list">
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
        <div className="create-train-header">
          <h3>Выбери упражнения</h3>
          <div className="choose-workout-list">
            {this.state.exercisesList.map((item) => (
              <button
                key={item.id}
                className="add-workout-btn"
                onClick={() => {
                  this.addWorkout(item.title);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <table className="create-train-table">
          <thead>
            <tr>
              <th>Название упражнения</th>
              <th>Кол-во повторений</th>
              <th>Рабочий вес</th>
            </tr>
          </thead>
          <tbody>
            {this.state.createTrain.map((item) => (
              <tr key={item.id}>
                <td>{item.excersise_name}</td>
                <td>
                  <input
                    type="text"
                    className="iteration"
                    value={item.plan_rep ? item.plan_rep : ""}
                    onChange={(e) => {
                      this.handleNumberRepetitions(item.id, e);
                    }}
                  />
                  раз
                </td>
                <td>
                  <input
                    type="text"
                    className="weight"
                    value={item.plan_weight ? item.plan_weight : ""}
                    onChange={(e) => {
                      this.handleworkingWeight(item.id, e);
                    }}
                  />
                  КГ
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.removeWorkout(item.id);
                    }}
                  >
                    х
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="save-session-button" onClick={this.clickSaveTrain}>
          Сохранить
        </button>
      </div>
    );
  }
}
export default CreateTrainingSession;
