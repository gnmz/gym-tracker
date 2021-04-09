import React, { Component } from "react";

export class DropDownHeaderCreateExercise extends Component {
  render() {
    const { className, onClick, title } = this.props;
    return (
      <div className={className} onClick={onClick}>
        <p className="drop-down-header">{title}</p>
        <div className="select-test-arrow">
          <svg className="strelka-bottom-3" viewBox="0 0 5 9">
            <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"></path>
          </svg>
        </div>
      </div>
    );
  }
}

export default DropDownHeaderCreateExercise;
