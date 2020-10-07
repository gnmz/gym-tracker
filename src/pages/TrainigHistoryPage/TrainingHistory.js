import React, { Component } from "react";
import ChooseTrain from "../../components/ChooseTrain";
import { Link } from "react-router-dom";
import "./TrainingHistory.css";
class TrainingHistory extends Component {
  state = {
    historyTrainList: [],
  };
  componentDidMount() {
    this.getTrainingHistoryList();
  }
  getTrainingHistoryList = () => {
    fetch("http://localhost:3001/trains?type=hist")
      .then((res) => res.json())
      .then((data) => this.setState({ historyTrainList: data }));
  };
  render() {
    return (
      <div className="history-page">
        <h2 className="history-page__title">Прошедшие тренировки</h2>
        <div className="history-page__trains">
          {this.state.historyTrainList.map((item) => (
            <Link to={`/train-history/${item.id}`} key={item.id}>
              <ChooseTrain date={item.date} title={item.title} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default TrainingHistory;
