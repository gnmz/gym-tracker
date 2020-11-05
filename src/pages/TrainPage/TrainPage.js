import React, { Component } from "react";
import dayjs from "dayjs";
import "./TrainPage.css";
import { Link } from "react-router-dom";

class TrainPage extends Component {
  state = {
    id: "",
    date: "",
    title: "",
    comment: "",
    is_completed: false,
    excersises: [],
    complite: [],
    isClicked: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getCurrentTrain(id);
  }
  //получаем тренировку
  getCurrentTrain = (id) => {
    fetch(`http://localhost:3001/trains/${id}`, {
      headers: {token: localStorage.getItem('token')}
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          id: data[0].id,
          date: data[0].DATE,
          title: data[0].title,
          excersises: JSON.parse(data[0].excersises),
        })
      );
  };
  //заканчиваем тренировку
  endOfTraining = () => {
    this.setState({ isClicked: true });
    const data = {
      ...this.state,
      excersises: JSON.stringify(this.state.excersises),
      is_completed: true,
    };
    fetch(`http://localhost:3001/trains`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  // получаем значение из инпута факт повторения
  handleFactNumberRepetitions = (id, e) => {
    const value = e.target.value;
    const updateTrain = this.state.excersises.map((item) => {
      if (item.id === id) {
        item.fact_rep = value;
      }
      return item;
    });
    this.setState({ excersises: updateTrain });
  };
  // получаем значение из инпута факт вес
  handleFactWeight = (id, e) => {
    const value = e.target.value;
    const updateTrain = this.state.excersises.map((item) => {
      if (item.id === id) {
        item.fact_weight = value;
      }
      return item;
    });
    this.setState({ excersises: updateTrain });
  };
  //получить значение из textarea
  getComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  render() {
    console.log(this.state.comment)
    return (
      <div className="train-page">
        <h2 className="train-page__title">
          {dayjs(this.state.date).format("DD MMM YYYY")}, {this.state.title}
        </h2>

        {this.state.excersises.map((item) => (
          <div className="train-page-item" key={item.id}>
            <p className="train-page-item__title">{item.excersise_name}</p>
            <label className="train-page-item__property">
              <input
                type="text"
                className="train-page-item__input"
                value={item.fact_rep ? item.fact_rep : ""}
                onChange={(e) => {
                  this.handleFactNumberRepetitions(item.id, e);
                }}
              />
              / {item.plan_rep} р
            </label>
            {item.plan_weight ? (
              <label className="train-page-item__property">
                <input
                  type="text"
                  className="train-page-item__input"
                  value={item.fact_weight ? item.fact_weight : ""}
                  onChange={(e) => {
                    this.handleFactWeight(item.id, e);
                  }}
                />
                / {item.plan_weight} кг
              </label>
            ) : null}
          </div>
        ))}
        <div>
          <h2 className="train-page__title">Оставь комментарий:</h2>
          <textarea
            className="train-page_text-area"
            onChange={this.getComment}
          ></textarea>
        </div>
        {!this.state.isClicked ? (
          <button
            onClick={this.endOfTraining}
            className="train-page_complete-button"
          >
            Тренировка завершена
          </button>
        ) : (
          <Link to="/main">Вернуться к списку тренировок</Link>
        )}
      </div>
    );
  }
}

export default TrainPage;
