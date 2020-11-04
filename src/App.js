import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CreateTrainingSession from "./pages/CreateTrainingSession/CreateTrainingSession";
import MainPage from "./pages/MainPage/MainPage";
import TrainingHistory from "./pages/TrainigHistoryPage/TrainingHistory";
import TrainPage from "./pages/TrainPage/TrainPage";
import PastTrainingPage from "./pages/PastTrainingPage/PastTrainingPage";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Route path="/" exact component={MainPage} />
        <Route
          path="/create-trainig-session"
          component={CreateTrainingSession}
        />
        <Route path="/train-history" exact component={TrainingHistory} />
        <Route path="/train/:id" exact component={TrainPage} />
        <Route path="/train-history/:id" exact component={PastTrainingPage} />
      </div>
    );
  }
}

export default App;
