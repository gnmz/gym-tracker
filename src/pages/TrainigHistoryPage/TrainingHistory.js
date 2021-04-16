import React, { Component } from "react";
import ChooseTrain from "../../components/ChooseTrain";
import { Link } from "react-router-dom";
import "./TrainingHistory.css";
import Loader from "../../components/Loader/Loader";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";

class TrainingHistory extends Component {
  state = {
    historyTrainList: [],
    trainHistoryPage: [
      { id: 1, title: "Главная", link: "/main" },
      { id: 2, title: "История тренировок" },
    ],
  };
  componentDidMount() {
    this.getTrainingHistoryList();
  }
  //Получаем список истории тренировок и сортируем его
  getTrainingHistoryList = () => {
    fetch("/trains?type=hist", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) =>
        data.sort((a, b) => {
          if (a.DATE > b.DATE) {
            return -1;
          } else {
            return 1;
          }
        })
      )
      .then((data) => this.setState({ historyTrainList: data }));
  };
  render() {
    const { historyTrainList, trainHistoryPage } = this.state;
    return (
      <div>
        {historyTrainList.length > 0 ? (
          <>
            <BreadCrumbsGymsTracker breadCrumb={trainHistoryPage} />
            <div className="history-page">
              {/* <h2 className="history-page__title">Прошедшие тренировки</h2> */}
              <div className="history-page__trains">
                {historyTrainList.map((item) => (
                  <Link to={`/train-history/${item.id}`} key={item.id}>
                    <ChooseTrain date={item.DATE} title={item.title} />
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default TrainingHistory;
