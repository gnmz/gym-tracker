import React, { Component } from "react";

import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import "./TrainPageHeader.css";

export class TrainPageHeader extends Component {
  render() {
    const { trainDate, trainTitle, startTrain, start } = this.props;
    return (
      <div className="train-page__header">
        <h2 className="train-page__title">
          {dayjs(trainDate).format("DD MMM YYYY")}, {trainTitle}
        </h2>
        {start ? null : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={startTrain}
            className="train-page__start-train-button"
          >
            Начать тренировку
          </Button>
        )}
      </div>
    );
  }
}

export default TrainPageHeader;
