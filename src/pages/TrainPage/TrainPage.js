import React, { Component } from "react";

import "./TrainPage.css";

import Loader from "../../components/Loader/Loader";
import TrainPageFinishedTrain from "../../components/TrainPage/TrainPageFinishedTrain/TrainPageFinishedTrain";
import TrainPageHeader from "../../components/TrainPage/TrainPageHeader/TrainPageHeader";
import TrainPageList from "../../components/TrainPage/TrainPageList/TrainPageList";
import TrainPageComment from "../../components/TrainPage/TrainPageComment/TrainPageComment";

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

  startTrain = () => {
    let start = new Date();
    this.setState({ start: true, startTrain: start });
  };

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
            <TrainPageList
              excersises={this.state.excersises}
              startTrain={this.state.start}
              handleFactNumberRepetitions={this.handleFactNumberRepetitions}
              handleFactWeight={this.handleFactWeight}
            />
            <TrainPageComment getComment={this.getComment} startTrain={start} />
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
