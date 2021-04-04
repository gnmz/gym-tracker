import React, { Component } from "react";
import "./EditExcersise.css";

export class CreateCategories extends Component {
  state = {
    categories_title: "",
  };
  //Создание категории
  createCategories = () => {
    fetch(`http://localhost:3001/custom-categories`, {
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
          alert(`${data.error} - ${this.state.categories_title}`);
        } else {
          alert(`Категория ${this.state.categories_title} успешно добавлена`);
        }
      });
  };
  render() {
    const { newCategoryOfExercises } = this.props;
    console.log(newCategoryOfExercises);
    return (
      <div className="create-categories">
        <label>
          <span className="create-categories__title">Название категории</span>
          <input
            className="create-categories__input"
            type="text"
            value={this.state.categories_title}
            onChange={(e) => {
              this.setState({ categories_title: e.target.value });
            }}
          />
        </label>
        <button
          className="create-categories__button"
          onClick={this.createCategories}
        >
          Создать новую категорию
        </button>
      </div>
    );
  }
}

export default CreateCategories;
