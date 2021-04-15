import React, { Component } from "react";

import "./TrainPageComment.css";

export class TrainPageComment extends Component {
  render() {
    const { startTrain, getComment } = this.props;
    return (
      <div>
        <h2 className="train-page__title">Оставь комментарий:</h2>
        <textarea
          className="train-page_text-area"
          onChange={getComment}
          disabled={!startTrain}
        ></textarea>
      </div>
    );
  }
}

export default TrainPageComment;
