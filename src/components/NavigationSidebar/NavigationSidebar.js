import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "./NavigationSidebar.css";

export class NavigationSidebar extends Component {
  isActive = (item) => {
    const { acitveItem } = this.props;
    if (item === "main" && item === acitveItem) {
      return "contained";
    }
    if (item === "create train" && item === acitveItem) {
      return "contained";
    }
    if (item === "train history" && item === acitveItem) {
      return "contained";
    }
    if (item === "edit" && item === acitveItem) {
      return "contained";
    } if (item === "calorie-calculation" && item === acitveItem) {
      return "contained";
    }
    else {
      return "outlined";
    }
  };

  render() {
    return (
      <div className="navigation-sidebar">
        <ButtonGroup
          className="navigation-sidebar-list"
          orientation="vertical"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          <Button
            variant={this.isActive("main")}
            className="navigation-sidebar-list__item"
            component={Link}
            to="/main"
          >
            главная
          </Button>
          <Button
            variant={this.isActive("create train")}
            className="navigation-sidebar-list__item"
            component={Link}
            to="/create-trainig-session"
          >
            Создать тренировку
          </Button>
          <Button
            variant={this.isActive("train history")}
            className="navigation-sidebar-list__item"
            component={Link}
            to="/train-history"
          >
            История тренировок
          </Button>

          <Button
            variant={this.isActive("edit")}
            className="navigation-sidebar-list__item"
            component={Link}
            to="/edit-exercises"
          >
            Редактировать упраженения
          </Button>
          <Button
            variant={this.isActive("calorie-calculation")}
            className="navigation-sidebar-list__item"
            component={Link}
            to="/calorie-calculation"
          >
            Калькулятор калорий
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default NavigationSidebar;
