import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import ChooseTrain from "../../components/ChooseTrain";
import Logout from "../../components/Logout";
import Loader from "../../components/Loader/Loader";

import Button from "@material-ui/core/Button";
import BreadCrumbsGymsTracker from "../../components/BreadCrumbsGymsTracker/BreadCrumbsGymsTracker";

class MainPage extends Component {
  state = {
    createdTrainingSessions: [],
    stopFetchedData: false,
    mainPage: [{ id: 1, title: "main" }],
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
        <Logout history={this.props.history} />
        <BreadCrumbsGymsTracker breadCrumb={this.state.mainPage} />
        <div className="main-page__choose-action">
          <Link to="/create-trainig-session">
            <Button
              variant="outlined"
              color="primary"
              className="main-page__choose-action-btn"
            >
              Создать тренировку
            </Button>
          </Link>
          <Link to="/train-history">
            <Button
              variant="outlined"
              color="primary"
              className="main-page__choose-action-btn"
            >
              История тренировок
            </Button>
          </Link>
          <Link to="/edit-exercises">
            <Button
              variant="outlined"
              color="primary"
              className="main-page__choose-action-btn"
            >
              Редактировать упраженения
            </Button>
          </Link>
        </div>
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
              >
                <ChooseTrain date={item.DATE} title={item.title} />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;
