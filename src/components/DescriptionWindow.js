import React, { Component } from "react";

class DescriptionWindow extends Component {
  render() {
    const { title, description, onClick } = this.props;
    return (
      <div className="create-train-program-item__description">
        <div className="create-train-program-item__description-info">
          <h5 className="create-train-program-item__description-info-title">
            {title}
          </h5>
          <p className="create-train-program-item__description-info-text">
            {description}some text
          </p>
        </div>
        <button
          className="create-train-program-item__description-close"
          onClick={onClick}
        >
          x
        </button>
      </div>
    );
  }
}
export default DescriptionWindow;
