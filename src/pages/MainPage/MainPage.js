import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./MainPage.css";
import ChooseTrain from "../../components/ChooseTrain";

class MainPage extends Component {
  state = {
    createdTrainingSessions: [],
  };
  componentDidMount() {
    this.getCreatedTrainingSessinos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.getCreatedTrainingSessinos();
    }
  }
  getCreatedTrainingSessinos = () => {
    const URL = "http://localhost:3001/trains?type=plan";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ createdTrainingSessions: data });
      });
  };
  render() {
    return (
      <div className="choose-action">
        <div className="choose-action_list">
          <Link to="/create-trainig-session">
            <button>Создать тренировку</button>
          </Link>
          <Link to="/train-history">
            <button>История тренировок</button>
          </Link>
        </div>
        <h2>Запланированные тренировки</h2>
        <div className="trains">
          {this.state.createdTrainingSessions.map((item) => (
            <Link to={`/train/${item.id}`} className="train-link">
              <ChooseTrain date={item.date} title={item.title} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
