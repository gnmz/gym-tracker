import React, { Component } from "react";
import "./ExercisesSearch.css";

export class ExercisesSearch extends Component {
  render() {
    const {
      searchByNameValue,
      searchByCategoryValue,
      searchByName,
      searchByCategory,
    } = this.props;
    return (
      <div className="exercises-header-item__exercise-search">
        <input
          type="text"
          className="exercises-header-item__exercise-search-item"
          value={searchByNameValue}
          onChange={searchByName}
          disabled={searchByCategoryValue.length > 0}
        />

        <input
          type="text"
          className="exercises-header-item__exercise-search-item"
          value={searchByCategoryValue}
          onChange={searchByCategory}
          disabled={searchByNameValue.length > 0}
        />
      </div>
    );
  }
}

export default ExercisesSearch;
