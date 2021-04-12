import React, { Component } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./PastTrainingPage.css";

class PastTrainingPage extends Component {
  state = {
    id: "",
    date: "",
    title: "",
    comment: "",
    is_completed: true,
    excersises: [],
    start_train: "",
    stop_train: "",
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getCurrentPastTrain(id);
  }
  getCurrentPastTrain = (id) => {
    fetch(`http://localhost:3001/trains/${id}`, {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          date: data[0].DATE,
          title: data[0].title,
          excersises: JSON.parse(data[0].excersises),
          comment: data[0].COMMENT,
          start_train: data[0].start_train,
          stop_train: data[0].stop_train,
        })
      );
  };
  render() {
    const { date, title, excersises, comment } = this.state;
    return (
      <div className="past-train-page">
        <div className="past-train-page__header">
          <h2 className="past-train-page__title">
            {dayjs(date).format("DD MMM YYYY")}, {title}
          </h2>
        </div>
        {excersises.map((item) => (
          <div className="past-train-page__item" key={item.id}>
            <p className="past-train-page__item-title">{item.excersise_name}</p>
            <label className="past-train-page__item-property">
              {item.fact_rep} / {item.plan_rep} раз
            </label>
            {item.plan_weight && item.fact_weight ? (
              <label className="past-train-page__item-property">
                {item.fact_weight} / {item.plan_weight} кг
              </label>
            ) : null}
          </div>
        ))}
        <h2 className="past-train-page__title">Комментарий</h2>
        <p className="past-train-page__comment">{comment}</p>
        <Link to="/train-history" className="past-train-page__link-back">
          <button className="past-train-page__button-back">
            В историю тренировок
          </button>
        </Link>
      </div>
    );
  }
}
export default PastTrainingPage;
