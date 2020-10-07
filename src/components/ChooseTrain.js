import React, { Component } from "react";
import dayjs from "dayjs";
class ChooseTrain extends Component {
  render() {
    const { date, title } = this.props;
    return (
      <div className="choose-train-cart">
        <h3 className="choose-train-cart__title">{title}</h3>
        <p className="choose-train-cart__date">
          {dayjs(date).format("DD MMM YYYY")}
        </p>
      </div>
    );
  }
}

export default ChooseTrain;
