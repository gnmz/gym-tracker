import React, { Component } from "react";

export class Categories extends Component {
  state = {
    categoryOfExercises: [],
  };
  componentDidMount() {
    fetch("http://localhost:3001/custom-categories", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ categoryOfExercises: data }));
  }

  render() {
    const { categoryOfExercises } = this.state;
    return (
      <div>
        {categoryOfExercises.length <= 0 ? (
          <h2>У вас еще нет категорий</h2>
        ) : (
          <>
            <h2>Твои Категории</h2>
            <div>
              {categoryOfExercises.map((item) => (
                <div key={item.id}>
                  <p>{item.title}</p>
                  {/* <button
                onClick={() => {
                  console.log(item.id);
                }}
              >
                Редактировать
              </button> */}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Categories;
