const express = require("express");
const app = express();
const mysql = require("mysql");
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const connection = mysql.createConnection(dbConfig);
// let users = [];

app.use(cors());

app.post("/", (req, res) => {
  const { login, password } = req.body;
  if (login === "test" && password === "123") {
    res.send;
  }
});

app.listen(3001, () => {
  console.log("Server is running on 3001 port");
});

app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM excersise_categories;", (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/excersise", (req, res) => {
  let categoryId = req.query.categoryId;
  let query = `SELECT excersises.id, excersises.title, excersises.description FROM excersises JOIN excersise_categories ON excersises.category_id = excersise_categories.id
  where excersises.category_id = ${categoryId};`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.get("/trains", (req, res) => {
  let type = req.query.type;
  if (type === "plan") {
    let query = `SELECT * FROM trains WHERE is_completed = "false" ; `;
    connection.query(query, (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        console.log(err);
      }
    });
  } else if (type === "hist") {
    let query = `SELECT * FROM trains WHERE is_completed = "true" ; `;
    connection.query(query, (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        console.log(err);
      }
    });
  }
});

app.get("/trains/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM trains WHERE id = ${id};`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.put("/trains", (req, res) => {
  let id = req.body.id;
  let is_completed = req.body.is_completed;
  let excersises = req.body.excersises;
  let comment = req.body.comment;
  let query = `UPDATE trains SET excersises = '${excersises}', is_completed = '${is_completed}', comment = '${comment}' WHERE ( id = '${id}');`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.post("/trains", (req, res) => {
  let title = req.body.title;
  let date = req.body.date;
  let excersises = req.body.excersises;
  let is_completed = req.body.is_completed;
  let query = `INSERT INTO trains(title, date, excersises, is_completed ) VALUES ('${title}', '${date}', '${excersises}', '${is_completed}') ;`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

connection.connect((err) => {
  if (!err) {
    console.log("work!");
  }
});
