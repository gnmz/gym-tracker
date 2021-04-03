import React, { Component } from "react";

export class CreateExercise extends Component {
  state = {
    categoryOfExercises: [],
    exercisesList: [],
    categories_title: "",
    CreateExcersiseId: "",
    CreateCategoryTitle: "",
    CreateExcersiseTitle: "",
  };
  componentDidMount() {
    fetch("http://localhost:3001/custom-categories", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));
  }

  //Получаем список упражнений по категории
  getExercisesList = (id) => {
    fetch(`http://localhost:3001/custom-excersises?categoryId=${id}`, {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  };
  // Записываем Id категории для создания упражнений
  getCategory = (id, title) => {
    this.setState({ CreateExcersiseId: id, CreateCategoryTitle: title });
  };
  createExcersise = () => {
    fetch("http://localhost:3001/custom-excersises", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(this.state),
    });
  };
  render() {
    const { categoryOfExercises } = this.state;
    return (
      <div>
        {categoryOfExercises.length <= 0 ? (
          <>
            <h2>У вас еще нет категорий</h2>
            <p>Создайте категорию</p>
          </>
        ) : (
          <p>
            <h2>Добавить упраженение в категорию</h2>
            Выбери категорию
            <div>
              {categoryOfExercises.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    this.getCategory(item.id, item.title);
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <h2>Добавляете в категорию {this.state.CreateCategoryTitle}</h2>
            <input
              type="text"
              value={this.state.CreateExcersiseTitle}
              onChange={(e) => {
                this.setState({ CreateExcersiseTitle: e.target.value });
              }}
            />
            <button onClick={this.createExcersise}>Добавить упражнение</button>
          </p>
        )}
      </div>
    );
  }
}

export default CreateExercise;
