import React, { Component } from "react";
import "./EditExcersise.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditExcersiseModalNotificationWindow from "./EditExcersiseModalNotificationWindow/EditExcersiseModalNotificationWindow";

export class CreateCategories extends Component {
  state = {
    categories_title: "",
    isOpenModal: false,
    bodyModal: "",
  };
  //Создание категории
  createCategories = () => {
    const isLoading = this.props.isLoading;
    fetch(`http://localhost:3001/custom-categories`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            isOpenModal: true,
            bodyModal: `${data.error} - ${this.state.categories_title}`,
          });
        } else {
          // alert(`Категория ${this.state.categories_title} успешно добавлена`);
          this.setState({
            bodyModal: `Категория ${this.state.categories_title} успешно добавлена`,
            isOpenModal: true,
          });
          isLoading(true);
        }
      });
  };
  handleClose = (item) => {
    this.setState({ isOpenModal: item });
  };

  render() {
    return (
      <div className="create-categories">
        <TextField
          className="create-categories__input"
          id="outlined-basic"
          label="Новая категория"
          variant="outlined"
          size="small"
          value={this.state.categories_title}
          onChange={(e) => {
            this.setState({ categories_title: e.target.value });
          }}
        />
        <Button
          className="create-categories__button"
          variant="contained"
          color="primary"
          size="small"
          onClick={this.createCategories}
          disabled={!this.state.categories_title || this.state.isOpenModal}
        >
          Создать новую категорию
        </Button>

        <EditExcersiseModalNotificationWindow
          open={this.state.isOpenModal}
          body={this.state.bodyModal}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateCategories;
