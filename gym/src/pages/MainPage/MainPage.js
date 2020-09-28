import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

class MainPage extends Component {
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
            <Link to="/training-history">
              <button>История тренировок</button>
            </Link>
          </li>
        </ul>
        <h3>Запланированные тренировки</h3>
        <table className="table-created-traning-sessions">
          <thead>
            <th>№</th>
            <th>Дата тренировки</th>
            <th>Название тренировки</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>28-09-2020</td>
              <td>Грудь бицепс</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MainPage;
