const express = require("express");
const app = express.Router();
const logout = require("../controllers/logout");

app.get("/auth", logout);

module.exports = app;
