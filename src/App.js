import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import CreateTrainingSession from "./pages/CreateTrainingSession/CreateTrainingSession";
import MainPage from "./pages/MainPage/MainPage";
import TrainingHistory from "./pages/TrainigHistoryPage/TrainingHistory";
import TrainPage from "./pages/TrainPage/TrainPage";
import PastTrainingPage from "./pages/PastTrainingPage/PastTrainingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditExcersise from "./pages/EditExcersise/EditExcersise";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={LoginPage} />
        <Route path="/main" exact component={MainPage} />
        <Route
          path="/create-trainig-session"
          component={CreateTrainingSession}
        />
        <Route path="/train-history" exact component={TrainingHistory} />
        <Route path="/train/:id" exact component={TrainPage} />
        <Route path="/train-history/:id" exact component={PastTrainingPage} />
        <Route path="/edit-exercises" exact component={EditExcersise} />
      </div>
    );
  }
}

export default App;
