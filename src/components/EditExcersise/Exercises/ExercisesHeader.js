import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";

import "./ExercisesHeader.css";

export class ExercisesHeader extends Component {
  render() {
    const { search, sortByExercises, sortByCategory } = this.props;
    return (
      <div className="exercises-header">
        <h5
          className="exercises-header-item__exercise-title"
          onClick={sortByExercises}
        >
          Название
        </h5>
        <h5
          className="exercises-header-item__exercise-category"
          onClick={sortByCategory}
        >
          Категория
        </h5>
        <button
          className="exercises-header-item__exercise-search-btn"
          onClick={search}
        >
          <SearchIcon />
        </button>
        <h5 className="exercises-header-item__exercise-remove">
          <EditIcon />
        </h5>
      </div>
    );
  }
}

export default ExercisesHeader;
