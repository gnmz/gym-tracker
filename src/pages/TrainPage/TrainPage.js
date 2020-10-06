import React, { Component } from "react";
import dayjs from "dayjs";
import "./TrainPage.css";

class TrainPage extends Component {
  state = {
    id: "",
    date: "",
    title: "",
    comment: "",
    is_completed: false,
    excersises: [],
    complite: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getCurrentTrain(id);
  }
  //получаем тренировку
  getCurrentTrain = (id) => {
    fetch(`http://localhost:3001/trains/${id}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          id: data[0].id,
          date: data[0].date,
          title: data[0].title,
          excersises: JSON.parse(data[0].excersises),
        })
      );
  };
  //заканчиваем тренировку
  endOfTraining = () => {
    const data = {
      ...this.state,
      excersises: JSON.stringify(this.state.excersises),
      is_completed: true
    }
    fetch(`http://localhost:3001/trains`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  // получаем значение из инпута факт повторения
  handleFactNumberRepetitions = (id, e) => {
    const value = e.target.value;
    const updateTrain = this.state.excersises.map((item) => {
      if (item.id === id) {
        item.fact_rep = value;
      }
      return item;
    });
    this.setState({ excersises: updateTrain });
  };
  // получаем значение из инпута факт вес
  handleFactWeight = (id, e) => {
    const value = e.target.value;
    const updateTrain = this.state.excersises.map((item) => {
      if (item.id === id) {
        item.fact_weight = value;
      }
      return item;
    });
    this.setState({ excersises: updateTrain });
  };
  //получить значение из textarea
  getComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  render() {
    console.log(this.state);

    return (
      <div className="train-page">
        <div>
          <h2>
            {dayjs(this.state.date).format('DD MMM YYYY')}, {this.state.title}
          </h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Название упражнения</th>
              <th>Кол-во повторений</th>
              <th>Рабочий вес</th>
            </tr>
          </thead>
          <tbody>
            {this.state.excersises.map((item) => (
              <tr key={item.id}>
                <td>{item.excersise_name}</td>
                <td>
                  <input
                    type="text"
                    className="iteration"
                    value={item.fact_rep}
                    onChange={(e) => {
                      this.handleFactNumberRepetitions(item.id, e);
                    }}
                  />
                  /{item.plan_rep} раз
                </td>
                <td>
                  <input
                    type="text"
                    className="iteration"
                    value={item.fact_weight}
                    onChange={(e) => {
                      this.handleFactWeight(item.id, e);
                    }}
                  />
                  /{item.plan_weight} кг
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p>Комментарий</p>
          <textarea onChange={this.getComment}></textarea>
        </div>
        <button
          // disabled={this.state.is_completed}
          onClick={this.endOfTraining}
        >
          Тренировка завершена
        </button>
      </div>
    );
  }
}

export default TrainPage;
