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
  //Получаем список истории тренировок и сортируем его 
  getTrainingHistoryList = () => {
    fetch("http://localhost:3001/trains?type=hist", {
      headers: { token: localStorage.getItem('token')}
    })
      .then((res) => res.json())
      .then((data) => 
      data.sort((a,b) => {
        if (a.date > b.date) {
          return -1;
        } else {
          return 1;
        }
      })
      )
      .then((data) =>this.setState({ historyTrainList: data }))
  };
  render() {
    const { historyTrainList } = this.state;
    return (
      <div className="history-page">
        <h2 className="history-page__title">Прошедшие тренировки</h2>
        <div className="history-page__trains">
          {historyTrainList.map((item) => (
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
