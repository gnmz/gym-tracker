import React, { Component } from "react";

import "./TrainPage.css";
import Button from "@material-ui/core/Button";
import Loader from "../../components/Loader/Loader";
import TrainPageFinishedTrain from "../../components/TrainPage/TrainPageFinishedTrain/TrainPageFinishedTrain";
import TrainPageHeader from "../../components/TrainPage/TrainPageHeader/TrainPageHeader";

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
    startTrain: "",
    stopTrain: "",
    start: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getCurrentTrain(id);
  }
  //получаем тренировку
  getCurrentTrain = (id) => {
    fetch(`http://localhost:3001/trains/${id}`, {
      headers: { token: localStorage.getItem("token") },
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
      stopTrain: new Date(),
    };
    // fetch(`http://localhost:3001/trains`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    console.log(data);
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

  startTrain = () => {
    let start = new Date();
    this.setState({ start: true, startTrain: start });
  };

  // stopTrain = () => {
  //   let stop = new Date();
  //   this.setState({ stopTrain: stop }, () => {
  //     let start = this.state.startTrain;
  //     let stop = this.state.stopTrain;
  //     console.log(
  //       `${stop.getHours() - start.getHours()} - ${this.trainTime(
  //         start.getMinutes(),
  //         60
  //       )}  `
  //     );
  //   });
  // };

  // trainTime = (startTime, stopTime) => {
  //   if (stopTime.getMinutes() - startTime.getMinutes() < 10) {
  //     return `0${stopTime.getMinutes() - startTime.getMinutes()}`;
  //   } else {
  //     return stopTime.getMinutes() - startTime.getMinutes();
  //   }
  // };

  disabledTrain = () => {
    const { start } = this.state;
    if (!start) {
      return "train-page train-disabled";
    } else {
      return "train-page";
    }
  };

  render() {
    const { start } = this.state;
    return (
      <div className={this.disabledTrain()}>
        {this.state.id.length <= 0 ? (
          <Loader />
        ) : (
          <>
            <TrainPageHeader
              trainDate={this.state.date}
              trainTitle={this.state.title}
              startTrain={this.startTrain}
              start={this.state.start}
            />
            {this.state.excersises.map((item) => (
              <div className="train-page-item" key={item.id}>
                <p className="train-page-item__title">{item.excersise_name}</p>
                <label className="train-page-item__property">
                  <input
                    type="text"
                    className="train-page-item__input"
                    disabled={!start}
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
                      disabled={!start}
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
                disabled={!start}
              ></textarea>
            </div>
          </>
        )}
        <TrainPageFinishedTrain
          endOfTraining={this.endOfTraining}
          isClicked={this.state.isClicked}
          startTrain={this.state.start}
        />
      </div>
    );
  }
}

export default TrainPage;
