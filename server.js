const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { connect } = require("http2");
const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = require("./config/connection");

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/create-trainig-session", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/train-history", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/train/:id", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/train-history/:id", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/edit-exercises", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Подключение роутов
const categories = require("./routes/categories");
const excersise = require("./routes/excersise");
const customCategories = require("./routes/customCategories");
const customExcersises = require("./routes/customExcersises");
const trains = require("./routes/trains");
const reg = require("./routes/reg");
const auth = require("./routes/auth");
const logout = require("./routes/logout");

app.use("/", categories);
app.use("/", excersise);
app.use("/", customCategories);
app.use("/", customExcersises);
app.use("/", trains);
app.use("/", reg);
app.use("/", auth);
app.use("/", logout);
//

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});

connection.connect((err) => {
  if (!err) {
    console.log("work!");
  }
});
