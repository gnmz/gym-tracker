const express = require("express");
const app = express.Router();
const getExcersises = require("../controllers/excersise");

app.get("/excersise", getExcersises);

module.exports = app;
