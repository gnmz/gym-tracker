import React, { Component } from "react";

class PastTrainingPage extends Component {
  state = {
    id: "",
    date: "",
    title: "",
    comment: "",
    is_completed: true,
    excersises: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getCurrentPastTrain(id);
  }
  getCurrentPastTrain = (id) => {
    const URL = `http://localhost:3001/trains/${id}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          date: data[0].date,
          title: data[0].title,
          excersises: JSON.parse(data[0].excersises),
          comment: data[0].comment,
        })
      );
  };
  render() {
    const { date, title, excersises, comment } = this.state;
    return (
      <div>
        <h2>
          {date}, {title}
        </h2>
        <table>
          <thead>
            <tr>
              <th>название упражнения</th>
              <th>Колчисетво повторений</th>
              <th>Рабочий вес</th>
            </tr>
          </thead>
          <tbody>
            {excersises.map((item) => (
              <tr key={item.id}>
                <td>{item.excersise_name}</td>
                <td>
                  {item.fact_rep} / {item.plan_rep} раз
                </td>
                <td>
                  {item.fact_weight} / {item.plan_weight} кг
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Комментарий</p>
        <p>{comment}</p>
      </div>
    );
  }
}
export default PastTrainingPage;
