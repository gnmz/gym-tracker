const express = require("express");
const app = express.Router();
const reg = require("../controllers/reg");

app.post("/reg", reg);

module.exports = app;
