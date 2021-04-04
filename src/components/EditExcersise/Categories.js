import React, { Component } from "react";

export class Categories extends Component {
  state = {
    categoryOfExercises: [],
    chooseCategory: [],
    chooseCategoryName: "",
    newCategoryName: "",
  };
  chooseCategory = (id, title, userId) => {
    this.setState({
      chooseCategory: [
        {
          id: id,
          title: title,
          user_id: userId,
        },
      ],
      chooseCategoryName: title,
    });
  };

  renameCategoryName = () => {
    const categoryId = this.state.chooseCategory[0].id;
    const userId = this.state.chooseCategory[0].user_id;
    const newTitle = this.state.newCategoryName;

    const data = {
      id: categoryId,
      newTitle: newTitle,
      user_id: userId,
    };
    this.setState({ renameCategoryName: false }, () => {
      fetch("http://localhost:3001/custom-categories", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
    });
  };

  deleteCategory = () => {
    const categoryId = this.state.chooseCategory[0].id;
    const title = this.state.chooseCategory[0].title;
    const userId = this.state.chooseCategory[0].user_id;

    const data = {
      id: categoryId,
      title: title,
      user_id: userId,
    };
    this.setState({ deleteCategory: false, chooseCategory: [] }, () => {
      fetch("http://localhost:3001/custom-categories", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
    });
  };

  render() {
    const { chooseCategory } = this.state;
    const { categoryOfExercises } = this.props;

    return (
      <div className="categories">
        {categoryOfExercises.length <= 0 ? (
          <h2 className="categories-title">У вас еще нет категорий</h2>
        ) : (
          <>
            <div className="categories-list">
              {categoryOfExercises.map((item) => (
                <button
                  className="categories-list-item"
                  key={item.id}
                  onClick={() => {
                    this.chooseCategory(item.id, item.title, item.user_id);
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </>
        )}
        {chooseCategory.map((item) => (
          <div key={item.id}>
            <p>
              Вы выбрали категорию: <b>{item.title}</b>
            </p>
            <button
              onClick={() => {
                this.setState({
                  renameCategoryName: true,
                  deleteCategory: false,
                });
              }}
            >
              Переименовать
            </button>
            <button
              onClick={() => {
                this.setState({
                  deleteCategory: true,
                  renameCategoryName: false,
                });
              }}
            >
              Удалить
            </button>
          </div>
        ))}
        {this.state.renameCategoryName ? (
          <div>
            <input
              type="text"
              value={this.state.newCategoryName}
              onChange={(e) => {
                this.setState({ newCategoryName: e.target.value });
              }}
            />
            <p>
              Переименовать категорию {this.state.chooseCategoryName} в{" "}
              {this.state.newCategoryName}
            </p>
            <button onClick={this.renameCategoryName}>Да</button>
            <button
              onClick={() => {
                this.setState({ renameCategoryName: false });
              }}
            >
              Нет
            </button>
          </div>
        ) : null}
        {this.state.deleteCategory ? (
          <div>
            <p>Удалить категорию {this.state.chooseCategoryName}?</p>
            <p>
              Если Вы удалите категорию все упраженения связанные с выбранной
              категорией так же удалятся
            </p>
            <button onClick={this.deleteCategory}>Да</button>
            <button
              onClick={() => {
                this.setState({ deleteCategory: false });
              }}
            >
              Нет
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Categories;
