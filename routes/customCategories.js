const express = require("express");
const app = express.Router();
const customCategories = require("../controllers/customCategories");

app.get("/custom-categories", customCategories.getCustomCategories);
app.get("/custom-categories-all", customCategories.getCustomCategoriesAll);
app.post("/custom-categories", customCategories.postCustomCategories);
app.put("/custom-categories", customCategories.putCustomCategories);
app.delete("/custom-categories", customCategories.deleteCustomCategories);

module.exports = app;
