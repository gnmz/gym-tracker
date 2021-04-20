const express = require("express");
const app = express.Router();
const customExcersises = require("../controllers/customExcersises");

app.get("/custom-excersises", customExcersises.getCustomExcersises);
app.post("/custom-excersises", customExcersises.postCustomExcersises);
app.put("/custom-excersises", customExcersises.putCustomExcersises);
app.delete("/custom-excersises", customExcersises.deleteCustomExcersises);

module.exports = app;
