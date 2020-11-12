import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./MainPage.css";
import ChooseTrain from "../../components/ChooseTrain";
import Logout from "../../components/Logout";

class MainPage extends Component {
  state = {
    createdTrainingSessions: []
  };
  componentDidMount() {
    this.getCreatedTrainingSessinos();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.value !== this.state.value) {
  //     this.getCreatedTrainingSessinos();
  //   }
  // }
  //Получаем список созданных тренировок и сортируем их от ближайшей даты
  getCreatedTrainingSessinos = () => {
    fetch("/trains?type=plan", {
      headers: { token: localStorage.getItem('token')}
    })
      .then((res) => res.json())
      .then((data) => 
      data.sort((a,b) => {
        if (a.DATE > b.DATE) {
          return 1;
        } else {
          return -1;
        }
      })
      )
      .then((data) => {
        this.setState({ createdTrainingSessions: data });
      });
  };
  render() {
    return (
      <div className="main-page">
        <Logout history={this.props.history} />
        <div className="main-page__choose-action">
          <Link to="/create-trainig-session">
            <button className="main-page__choose-action-btn">
              Создать тренировку
            </button>
          </Link>
          <Link to="/train-history">
            <button className="main-page__choose-action-btn">
              История тренировок
            </button>
          </Link>
        </div>
        <h2 className="main-page__title">Запланированные тренировки</h2>
        <div className="main-page__trains">
          {this.state.createdTrainingSessions.map((item) => (
            <Link to={`/train/${item.id}`} className="train-link" key={item.id}>
              <ChooseTrain date={item.DATE} title={item.title} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
