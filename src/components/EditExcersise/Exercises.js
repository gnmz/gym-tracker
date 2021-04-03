import React, { Component } from "react";

export class Exercises extends Component {
  state = {
    exercisesList: [],
  };
  componentDidMount() {
    fetch("http://localhost:3001/custom-excersises", {
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ exercisesList: data }));
  }

  render() {
    const { exercisesList } = this.state;
    return (
      <div>
        {exercisesList.length <= 0 ? (
          <h2>У вас еще нет упражнений</h2>
        ) : (
          <>
            <h2>Список всех упраженений</h2>
            <div>
              {exercisesList.map((item) => (
                <p key={item.id}>{item.title}</p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Exercises;
