import React, { Component } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./ExercisesPagination.css";

export class ExercisesPagination extends Component {
  render() {
    const { prevPage, nextPage, currentPage, pageSize, data } = this.props;
    return (
      <div className="exercises-pagination">
        <button
          className="exercises-pagination__btn"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ArrowBackIosIcon />
        </button>
        <p>{currentPage}</p>
        <button
          className="exercises-pagination__btn"
          onClick={nextPage}
          disabled={Math.ceil(data.length / pageSize) === currentPage}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    );
  }
}

export default ExercisesPagination;
