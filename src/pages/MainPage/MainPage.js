import React, { Component } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./MainPage.css";

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
        <ul className="choose-action_list">
          <li>
            <Link to="/create-trainig-session">
              <button>Создать тренировку</button>
            </Link>
          </li>
          <li>
            <Link to="/train-history">
              <button>История тренировок</button>
            </Link>
          </li>
        </ul>
        <h3>Запланированные тренировки</h3>
        <table className="table-created-traning-sessions">
          <thead>
            <tr>
              <th>Дата тренировки</th>
              <th>Название тренировки</th>
            </tr>
          </thead>
          <tbody>
            {this.state.createdTrainingSessions.map((item) => (
              <tr key={item.id}>
                <td>{dayjs(item.date).format('DD MMM YYYY')}</td>
                <td>
                  <Link to={`/train/${item.id}`}>{item.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MainPage;
