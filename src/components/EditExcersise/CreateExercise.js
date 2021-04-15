import React, { Component } from "react";
import DropDownHeaderCreateExercise from "./DropDownHeaderCreateExercise";

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
          alert(`${data.error}`);
        }
        if (data.message) {
          alert(`${data.message}`);
          isLoading(true);
        }
      });
  };

  toggle = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
    }
    if (!isOpen) {
      this.setState({ isOpen: true });
    }
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

  render() {
    const { defaultValueDropDownTitle } = this.state;
    const { categoryOfExercises } = this.props;
    return (
      <div className="create-exercise">
        {categoryOfExercises.length <= 0 ? (
          <>
            <h2>У вас еще нет категорий</h2>
          </>
        ) : (
          <>
            <div className="create-exercise-drop-down">
              {!this.state.isOpen ? (
                <DropDownHeaderCreateExercise
                  className={"create-exercise-drop-down-container"}
                  title={defaultValueDropDownTitle}
                  onClick={this.toggle}
                />
              ) : (
                <DropDownHeaderCreateExercise
                  className={"create-exercise-drop-down-container-active"}
                  title={defaultValueDropDownTitle}
                  onClick={this.toggle}
                />
              )}
              {this.state.isOpen ? (
                <div>
                  <ul className="create-exercise-drop-down-list">
                    {categoryOfExercises.map((item) => (
                      <li
                        className="create-exercise-drop-down-list-item"
                        key={item.id}
                        onClick={() => {
                          this.onOptionSelected(item.title, item.id);
                        }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="create-exercise-properties">
              <label
                className="create-exercise-properties__item"
                htmlFor="create-exercise-properties__item-input"
              >
                <span className="create-exercise-properties__item-title">
                  Название упражнения:
                </span>
                <input
                  id="create-exercise-properties__item-input"
                  className="create-exercise-properties__item-input"
                  type="text"
                  value={this.state.CreateExcersiseTitle}
                  onChange={(e) => {
                    this.setState({ CreateExcersiseTitle: e.target.value });
                  }}
                />
              </label>
              <label className="create-exercise-properties__item">
                <div className="create-exercise-properties__item-settings">
                  <span className="create-exercise-properties__item-title">
                    Описание упраженения:
                  </span>
                  <input
                    type="checkbox"
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
              <button
                className="create-exercise-properties_submit"
                onClick={this.createExcersise}
                disabled={
                  !this.state.CreateExcersiseTitle ||
                  this.state.defaultValueDropDownTitle === "Категории"
                }
              >
                Добавить упражнение
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CreateExercise;
