import React, { Component } from "react";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "./CreateTrainingSessionProperties.css";

export class CreateTrainingSessionProperties extends Component {
  render() {
    const {
      currentDate,
      handleDateChange,
      trainName,
      handleTrainName,
    } = this.props;
    return (
      <div className="create-train-page__properties">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="block"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Дата тренировки"
            value={currentDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="trainName"
          label="Название тренировки"
          name="trainName"
          size="small"
          value={trainName}
          onChange={handleTrainName}
        />
      </div>
    );
  }
}

export default CreateTrainingSessionProperties;
