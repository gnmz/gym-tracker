import React, { Component } from "react";

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
    });
  };
  render() {
    return (
      <div>
        <h2>Создай категорию</h2>
        <input
          type="text"
          value={this.state.categories_title}
          onChange={(e) => {
            this.setState({ categories_title: e.target.value });
          }}
        />
        <button onClick={this.createCategories}>+</button>
      </div>
    );
  }
}

export default CreateCategories;
