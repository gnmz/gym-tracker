const express = require("express");
const app = express.Router();
const auth = require("../controllers/auth");

app.post("/auth", auth);

module.exports = app;
