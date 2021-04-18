import React, { Component } from "react";
import ChooseTrain from "../../components/ChooseTrain";
import { Link } from "react-router-dom";
import "./TrainingHistory.css";
import Loader from "../../components/Loader/Loader";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";
import BottomMenuList from "../../components/BottomMenuList/BottomMenuList";
import Header from "../../components/Header";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";

class TrainingHistory extends Component {
  state = {
    sidebarItemActive: "train history",
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
    fetch("http://localhost:3001/trains?type=hist", {
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
      <>
        <div className="history-page">
          <BottomMenuList />
          <Header />
          <BreadCrumbsGymsTracker breadCrumb={trainHistoryPage} />
          <div className="history-page-wrapper">
            <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
            <div className="history-page-wrapper__content">
              <h2 className="main-page__title">История тренировок</h2>
              {historyTrainList.length > 0 ? (
                <>
                  <div className="history-page">
                    {/* <h2 className="history-page__title">Прошедшие тренировки</h2> */}
                    <div className="history-page__trains">
                      {historyTrainList.map((item) => (
                        <Link
                          to={`/train-history/${item.id}`}
                          key={item.id}
                          className="history-page__trains-link"
                        >
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
          </div>
        </div>
      </>
    );
  }
}

export default TrainingHistory;
