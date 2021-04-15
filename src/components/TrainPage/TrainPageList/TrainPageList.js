import React, { Component } from "react";

export class TrainPageList extends Component {
  render() {
    const {
      excersises,
      handleFactWeight,
      handleFactNumberRepetitions,
      startTrain,
    } = this.props;
    return (
      <div>
        {excersises.map((item) => (
          <div className="train-page-item" key={item.id}>
            <p className="train-page-item__title">{item.excersise_name}</p>
            <label className="train-page-item__property">
              <input
                type="text"
                className="train-page-item__input"
                disabled={!startTrain}
                value={item.fact_rep ? item.fact_rep : ""}
                onChange={(e) => {
                  handleFactNumberRepetitions(item.id, e);
                }}
              />
              / {item.plan_rep} р
            </label>
            {item.plan_weight ? (
              <label className="train-page-item__property">
                <input
                  type="text"
                  className="train-page-item__input"
                  disabled={!startTrain}
                  value={item.fact_weight ? item.fact_weight : ""}
                  onChange={(e) => {
                    handleFactWeight(item.id, e);
                  }}
                />
                / {item.plan_weight} кг
              </label>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default TrainPageList;
