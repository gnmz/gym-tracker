import React, { Component } from "react";

import EditExcersiseModalNotificationWindow from "./EditExcersiseModalNotificationWindow/EditExcersiseModalNotificationWindow";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export class CreateExercise extends Component {
  state = {
    categories_title: "",
    CreateExcersiseId: "",
    CreateCategoryTitle: "",
    CreateExcersiseTitle: "",
    isOpen: false,
    defaultValueDropDownTitle: "Категории",
    isOptionSelected: false,
    checkbox: false,
    exerciseDescription: "",
    isOpenModal: false,
    bodyModal: "",
  };

  createExcersise = () => {
    const isLoading = this.props.isLoading;
    fetch("/custom-excersises", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            isOpenModal: true,
            bodyModal: `${data.error}`,
          });
        }
        if (data.message) {
          this.setState({
            bodyModal: `${data.message}`,
            isOpenModal: true,
          });
          isLoading(true);
        }
      });
  };

  onOptionSelected = (option, id) => {
    const { isOptionSelected } = this.state;
    if (!isOptionSelected) {
      this.setState({
        isOptionSelected: true,
        defaultValueDropDownTitle: option,
        isOpen: true,
        CreateExcersiseId: id,
        CreateCategoryTitle: option,
      });
    } else if (isOptionSelected) {
      this.setState({
        defaultValueDropDownTitle: option,
        isOpen: false,
        CreateExcersiseId: id,
        CreateCategoryTitle: option,
      });
    }
  };
  checkboxToggle = () => {
    const { checkbox } = this.state;
    if (!checkbox) {
      this.setState({ checkbox: true });
    } else if (checkbox) {
      this.setState({ checkbox: false });
    }
  };

  handleClose = (item) => {
    this.setState({ isOpenModal: item });
  };

  render() {
    
    const { categoryOfExercises } = this.props;
    return (
      <div className="create-exercise">
        {categoryOfExercises.length <= 0 ? (
          <>
            <h2 style={{textAlign: 'center'}}>У вас еще нет категорий для добавления упражнений</h2>
          </>
        ) : (
          <>
            <div className="create-exercise-drop-down">
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Категории
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.CreateCategoryTitle}
                  onChange={(e) => {
                    this.setState({
                      CreateCategoryTitle: e.target.value,
                    });
                  }}
                  label="Категории"
                >
                  {categoryOfExercises.map((item) => (
                    <MenuItem
                      value={item.title}
                      onClick={() => {
                        this.onOptionSelected(item.title, item.id);
                      }}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Paper
              variant="outlined"
              square
              className="create-exercise-properties__wrapper"
            >
              <div className="create-exercise-properties">
                <TextField
                  size="small"
                  className="create-exercise-properties__item-input"
                  id="outlined-basic"
                  label="Название упражнения"
                  variant="outlined"
                  value={this.state.CreateExcersiseTitle}
                  onChange={(e) => {
                    this.setState({ CreateExcersiseTitle: e.target.value });
                  }}
                />
                <label className="create-exercise-properties__item">
                  <div className="create-exercise-properties__item-settings">
                    <span className="create-exercise-properties__item-title">
                      Описание упраженения:
                    </span>
                    <Checkbox
                      color="primary"
                      className="create-exercise-properties__item-checkbox"
                      onClick={this.checkboxToggle}
                    />
                  </div>
                  <textarea
                    disabled={!this.state.checkbox}
                    className="create-exercise-properties__item-text-area"
                    onChange={(e) => {
                      this.setState({ exerciseDescription: e.target.value });
                    }}
                  ></textarea>
                </label>
                <Button
                  className="create-exercise-properties_submit"
                  onClick={this.createExcersise}
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={
                    !this.state.CreateExcersiseTitle ||
                    this.state.defaultValueDropDownTitle === "Категории"
                  }
                >
                  Добавить упражнение
                </Button>
              </div>
            </Paper>
          </>
        )}
        <EditExcersiseModalNotificationWindow
          open={this.state.isOpenModal}
          body={this.state.bodyModal}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateExercise;
