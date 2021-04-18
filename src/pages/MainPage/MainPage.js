import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import ChooseTrain from "../../components/ChooseTrain";
import Header from "../../components/Header";
import Loader from "../../components/Loader/Loader";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";
import BottomMenuList from "../../components/BottomMenuList/BottomMenuList";
import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar";

class MainPage extends Component {
  state = {
    createdTrainingSessions: [],
    stopFetchedData: false,
    mainPage: [{ id: 1, title: "main" }],
    sidebarItemActive: "main",
  };
  componentDidMount() {
    this.getCreatedTrainingSessinos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.getCreatedTrainingSessinos();
    }
  }
  //Получаем список созданных тренировок и сортируем их от ближайшей даты
  getCreatedTrainingSessinos = () => {
    fetch("http://localhost:3001/trains?type=plan", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) =>
        data.sort((a, b) => {
          if (a.DATE > b.DATE) {
            return 1;
          } else {
            return -1;
          }
        })
      )
      .then((data) => {
        this.setState({ createdTrainingSessions: data, stopFetchedData: true });
      });
  };

  render() {
    return (
      <div className="main-page">
        <BottomMenuList />
        <Header />
        <BreadCrumbsGymsTracker breadCrumb={this.state.mainPage} />
        <div className="main-page-content__wrapper">
          <NavigationSidebar acitveItem={this.state.sidebarItemActive} />
          <div className="main-page-content__wrapper-block">
            <h2 className="main-page__title">Запланированные тренировки</h2>
            {!this.state.stopFetchedData ? (
              <Loader />
            ) : (
              <div className="main-page__trains">
                {this.state.createdTrainingSessions.map((item) => (
                  <Link
                    to={`/train/${item.id}`}
                    className="train-link"
                    key={item.id}
                    className="main-page__trains-link"
                  >
                    <ChooseTrain date={item.DATE} title={item.title} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
