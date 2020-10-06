import React, { Component } from "react";
import { Link } from "react-router-dom";

class TrainingHistory extends Component {
  state = {
    historyTrainList: [],
  };
  componentDidMount() {
    this.getTrainingHistoryList();
  }
  getTrainingHistoryList = () => {
    const URL = "http://localhost:3001/trains?type=hist";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => this.setState({ historyTrainList: data }));
  };
  render() {
    return (
      <div>
        <h2>Прошедшие тренировки</h2>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            {this.state.historyTrainList.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>
                  <Link to={`/train-history/${item.id}`}>{item.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TrainingHistory;
