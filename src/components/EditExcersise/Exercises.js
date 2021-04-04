import React, { Component } from "react";

export class Exercises extends Component {
  state = {};

  render() {
    const { exercisesList } = this.props;
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
