import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "./ExercisesHeader.css";

export class ExercisesHeader extends Component {
  state = {
    isSortByExercises: false,
    isSortByCategory: false,
  };

  sortByExercises = () => {
    const sortByExercises = this.props.sortByExercises;
    if (!this.state.isSortByExercises) {
      this.setState({ isSortByExercises: true, isSortByCategory: false });
    }
    sortByExercises();
  };

  sortByCategory = () => {
    const sortByCategory = this.props.sortByCategory;
    if (!this.state.isSortByCategory) {
      this.setState({ isSortByCategory: true, isSortByExercises: false });
    }
    sortByCategory();
  };

  render() {
    const { search, isSortByExercises, isSortByCategory } = this.props;

    return (
      <div className="exercises-header">
        <h4
          className="exercises-header-item__exercise-title"
          onClick={this.sortByExercises}
        >
          Название{" "}
          {this.state.isSortByExercises && isSortByExercises ? (
            <ArrowDropUpIcon />
          ) : null}
          {!isSortByExercises && this.state.isSortByExercises ? (
            <ArrowDropDownIcon />
          ) : null}
        </h4>
        <h4
          className="exercises-header-item__exercise-category"
          onClick={this.sortByCategory}
        >
          Категория{" "}
          {this.state.isSortByCategory && isSortByCategory ? (
            <ArrowDropUpIcon />
          ) : null}
          {!isSortByCategory && this.state.isSortByCategory ? (
            <ArrowDropDownIcon />
          ) : null}
        </h4>
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
