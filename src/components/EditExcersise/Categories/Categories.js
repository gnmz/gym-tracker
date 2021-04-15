import React, { Component } from "react";

import "./Categories.css";
import CategoriesModalWindow from "./CategoriesModalWindow";

export class Categories extends Component {
  state = {
    categoryOfExercises: [],
    chooseCategory: [],
    chooseCategoryName: "",
    newCategoryName: "",
    editTitleCategory: false,
    deleteCategory: false,
    isOpenModal: false,
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
      isOpenModal: true,
    });
  };

  renameCategoryName = () => {
    const categoryId = this.state.chooseCategory[0].id;
    const userId = this.state.chooseCategory[0].user_id;
    const newTitle = this.state.newCategoryName;
    const oldTitle = this.state.chooseCategory[0].title;

    const data = {
      id: categoryId,
      newTitle: newTitle,
      oldTitle: oldTitle,
      user_id: userId,
    };
    const loading = this.props.isLoading;
    this.setState({ editTitleCategory: false }, () => {
      fetch("/custom-categories", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(`${data.error}`);
          }
          if (data.message) {
            this.setState({ isOpenModal: false, newCategoryName: "" }, () => {
              alert(`${data.message}`);
              loading(true);
            });
          }
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
    const loading = this.props.isLoading;
    this.setState({ deleteCategory: false, chooseCategory: [] }, () => {
      fetch("/custom-categories", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            this.setState({ isOpenModal: false }, () => {
              alert(`${data.message}`);
              loading(true);
            });
          }
        });
    });
  };

  activateEditTitleCategory = () => {
    this.setState({
      editTitleCategory: true,
      deleteCategory: false,
    });
  };

  stopEditTitleCategory = () => {
    this.setState({ editTitleCategory: false });
  };

  activateDeleteCategory = () => {
    this.setState({
      deleteCategory: true,
      editTitleCategory: false,
    });
  };

  stopDeleteCategory = () => {
    this.setState({ deleteCategory: false });
  };

  getNewCategoryName = (e) => {
    this.setState({ newCategoryName: e.target.value });
  };

  closeModalWindow = () => {
    const { isOpenModal } = this.state;
    if (isOpenModal) {
      this.setState({ isOpenModal: false });
    }
  };

  render() {
    const {
      editTitleCategory,
      newCategoryName,
      deleteCategory,
      chooseCategoryName,
      isOpenModal,
    } = this.state;
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
                  disabled={isOpenModal}
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

        <CategoriesModalWindow
          isOpenModal={isOpenModal}
          chooseCategoryName={chooseCategoryName}
          activateEditTitleCategory={this.activateEditTitleCategory}
          activateDeleteCategory={this.activateDeleteCategory}
          isEditTitle={editTitleCategory}
          newCategoryName={newCategoryName}
          getNewCategoryName={this.getNewCategoryName}
          renameCategoryName={this.renameCategoryName}
          stopEditTitleCategory={this.stopEditTitleCategory}
          stopDeleteCategory={this.stopDeleteCategory}
          deleteCategory={this.deleteCategory}
          isDeleteCategory={deleteCategory}
          closeModalWindow={this.closeModalWindow}
        />
      </div>
    );
  }
}

export default Categories;
