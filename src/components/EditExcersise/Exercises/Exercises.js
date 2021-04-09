import React, { Component } from "react";
import ExercisesModalWindow from "./ExercisesModalWindow";
import ExercisesPagination from "./ExercisesPagination";
import ExercisesHeader from "./ExercisesHeader";
import ExercisesSearch from "./ExercisesSearch";

import EditIcon from "@material-ui/icons/Edit";
import "./Exercises.css";

export class Exercises extends Component {
  state = {
    sorted: [],
    editTitle: false,
    currentId: "",
    currentTitle: "",
    currentCategory: "",
    isOpenModal: false,
    newTitle: "",
    currentCategoryId: "",
    searchByName: "",
    searchByCategory: "",
    isOpenSearch: false,
    pageSize: 8,
    currentPage: 1,
  };

  removeExercises = () => {
    const { currentId, currentTitle, currentCategoryId } = this.state;
    const data = {
      id: currentId,
      category_id: currentCategoryId,
      title: currentTitle,
    };
    const isLoading = this.props.isLoading;
    this.setState({ deleteExercises: false }, () => {
      fetch("http://localhost:3001/custom-excersises", {
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
              isLoading(true);
            });
          }
        });
    });
  };
  sortBy = () => {
    const { categoryAndExercises } = this.props;
    let sorted = categoryAndExercises.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setState({ sorted: sorted });
  };
  editExercises = (id, title, category, categoryId) => {
    this.setState({
      currentId: id,
      currentTitle: title,
      currentCategory: category,
      currentCategoryId: categoryId,
      isOpenModal: true,
    });
  };

  saveNewTitle = () => {
    const { currentId, currentTitle, currentCategoryId, newTitle } = this.state;
    const data = {
      id: currentId,
      category_id: currentCategoryId,
      oldTitle: currentTitle,
      newTitle: newTitle,
    };
    const isLoading = this.props.isLoading;
    fetch("http://localhost:3001/custom-excersises", {
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
          this.setState({ isOpenModal: false, newTitle: "" }, () => {
            alert(`${data.message}`);
            isLoading(true);
          });
        }
      });

    isLoading(true);
  };

  closeModalWindow = () => {
    const { isOpenModal } = this.state;
    if (isOpenModal) {
      this.setState({ isOpenModal: false });
    }
  };
  search = () => {
    const { isOpenSearch } = this.state;
    if (!isOpenSearch) {
      this.setState({ isOpenSearch: true });
    } else if (isOpenSearch) {
      this.setState({ isOpenSearch: false });
    }
  };

  searchByName = (e) => {
    const { categoryAndExercises } = this.props;
    let value = e.target.value;
    this.setState({ searchByName: value }, () => {
      let searchable = categoryAndExercises.filter((item) => {
        return item.title.toLowerCase().includes(value);
      });
      if (searchable) {
        this.setState({ sorted: searchable });
      }
    });
  };

  searchByCategory = (e) => {
    const { categoryAndExercises } = this.props;
    let value = e.target.value;
    this.setState({ searchByCategory: value }, () => {
      let searchable = categoryAndExercises.filter((item) => {
        return item.category_title.toLowerCase().includes(value);
      });
      this.setState({ sorted: searchable });
    });
  };
  prevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  activateEditTitle = () => {
    this.setState({ editTitle: true, deleteExercises: false });
  };

  stopEditTitle = () => {
    this.setState({ editTitle: false });
  };

  activateDeleteExercises = () => {
    this.setState({ editTitle: false, deleteExercises: true });
  };

  stopDeleteExercises = () => {
    this.setState({ deleteExercises: false });
  };
  getNewTitle = (e) => {
    this.setState({ newTitle: e.target.value });
  };

  render() {
    const { categoryAndExercises } = this.props;
    const {
      pageSize,
      currentPage,
      sorted,
      isOpenSearch,
      searchByName,
      searchByCategory,
    } = this.state;

    return (
      <div className="exercises">
        <ExercisesHeader search={this.search} />
        <div className="exercises-list">
          {isOpenSearch ? (
            <ExercisesSearch
              searchByNameValue={searchByName}
              searchByCategoryValue={searchByCategory}
              searchByName={this.searchByName}
              searchByCategory={this.searchByCategory}
            />
          ) : null}
          {sorted.length > 0 ? (
            <>
              {sorted
                .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                .map((item) => (
                  <div key={item.id} className="exercises-list-item">
                    <p className="exercises-list-item__exercise-title">
                      {item.title}
                    </p>
                    <p className="exercises-list-item__exercise-category">
                      {item.category_title}
                    </p>
                    <button
                      className="exercises-header-item__exercise-remove-btn"
                      onClick={() => {
                        this.editExercises(
                          item.id,
                          item.title,
                          item.category_title,
                          item.category_id
                        );
                      }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ))}
              <ExercisesPagination
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                currentPage={currentPage}
                data={sorted}
                pageSize={pageSize}
              />
            </>
          ) : (
            <>
              {categoryAndExercises
                .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                .map((item) => (
                  <div key={item.id} className="exercises-list-item">
                    <p className="exercises-list-item__exercise-title">
                      {item.title}
                    </p>
                    <p className="exercises-list-item__exercise-category">
                      {item.category_title}
                    </p>
                    <button
                      className="exercises-header-item__exercise-remove-btn"
                      onClick={() => {
                        this.editExercises(
                          item.id,
                          item.title,
                          item.category_title,
                          item.category_id
                        );
                      }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ))}
              <ExercisesPagination
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                currentPage={currentPage}
                data={categoryAndExercises}
                pageSize={pageSize}
              />
            </>
          )}
        </div>
        <ExercisesModalWindow
          isOpenModal={this.state.isOpenModal}
          currentTitle={this.state.currentTitle}
          closeModalWindow={this.closeModalWindow}
          activateEditTitle={this.activateEditTitle}
          activateDeleteExercises={this.activateDeleteExercises}
          isEditTitle={this.state.editTitle}
          isDeleteExercises={this.state.deleteExercises}
          newTitle={this.state.newTitle}
          getNewTitle={this.getNewTitle}
          saveNewTitle={this.saveNewTitle}
          stopEditTitle={this.stopEditTitle}
          currentCategory={this.state.currentCategory}
          removeExercises={this.removeExercises}
          stopDeleteExercises={this.stopDeleteExercises}
        />
      </div>
    );
  }
}

export default Exercises;
