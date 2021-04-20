const express = require("express");
const app = express.Router();
const getCategories = require("../controllers/categories");

app.get("/categories", getCategories);

module.exports = app;
