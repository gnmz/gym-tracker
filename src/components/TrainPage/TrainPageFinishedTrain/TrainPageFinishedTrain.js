import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./TrainPageFinishedTrain.css";
import Button from "@material-ui/core/Button";

export class TrainPageFinishedTrain extends Component {
  render() {
    const { endOfTraining, isClicked, startTrain } = this.props;
    return (
      <div className="train-page__finished-train">
        {!isClicked && startTrain ? (
          <Button
            className="train-page__finished-train-button"
            color="primary"
            variant="contained"
            onClick={endOfTraining}
            size="small"
          >
            Тренировка завершена
          </Button>
        ) : (
          <Link to="/main">Вернуться к списку тренировок</Link>
        )}
      </div>
    );
  }
}

export default TrainPageFinishedTrain;
