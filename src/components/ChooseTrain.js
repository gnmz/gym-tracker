import React, { Component } from "react";
import dayjs from "dayjs";
class ChooseTrain extends Component {
  render() {
    const { date, title } = this.props;
    return (
      <div className="choose-train-cart">
        <h3>{title}</h3>
        <p>date : {dayjs(date).format("DD MMM YYYY")}</p>
      </div>
    );
  }
}

export default ChooseTrain;
