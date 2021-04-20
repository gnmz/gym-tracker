const express = require("express");
const app = express.Router();
const trains = require("../controllers/trains");

app.get("/trains", trains.getTrains);
app.get("/trains/:id", trains.getTrainsID);
app.post("/trains", trains.postTrains);
app.put("/trains", trains.putTrains);

module.exports = app;
