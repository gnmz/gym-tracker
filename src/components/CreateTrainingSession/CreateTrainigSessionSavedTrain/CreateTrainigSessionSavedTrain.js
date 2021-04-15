import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import "./CreateTrainigSessionSavedTrain.css";
import SaveIcon from "@material-ui/icons/Save";

export class CreateTrainigSessionSavedTrain extends Component {
  render() {
    const { isClicked, recordTrain } = this.props;
    return (
      <div className="create-train-program__saved-train">
        {!isClicked ? (
          <Button
            color="primary"
            variant="contained"
            className="create-train-program__save"
            onClick={recordTrain}
            size="small"
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
        ) : (
          <Link to="/main">Перейти к тренировкам</Link>
        )}
      </div>
    );
  }
}

export default CreateTrainigSessionSavedTrain;
