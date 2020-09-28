import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CreateTrainingSession from "./pages/CreateTrainingSession/CreateTrainingSession";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import TrainingHistory from "./pages/TrainigHistory.js/TrainingHistory";
class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Route path="/" exact component={LoginPage} />
        <Route path="/main" exact component={MainPage} />
        <Route
          path="/create-trainig-session"
          exact
          component={CreateTrainingSession}
        />
        <Route path="/training-history" exact component={TrainingHistory} />
      </div>
    );
  }
}

export default App;
