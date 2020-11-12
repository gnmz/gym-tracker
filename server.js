const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const dbConfig = require("./config/dbConfig");
const cors = require("cors");
const bcrypt = require("bcrypt");
const randtoken = require("rand-token");
const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection(dbConfig);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
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
  const token = req.get("token");
  connection.query(`SELECT id FROM users WHERE user_token = '${token}';`, (err, data) => {
    if (!err && data.length && type === "plan") {
      const user = data[0];
      connection.query(`SELECT * FROM trains WHERE is_completed = "false" AND user_id = "${user.id}";`, (err, data) => {
        if (!err) {
          res.status(200).json(data);
        } else {
          console.log(err);
        }
      });
    } else if (!err && data.length && type === "hist"){
      const user = data[0];
      connection.query(`SELECT * FROM trains WHERE is_completed = "true" AND user_id = "${user.id}"; `, (err, data) => {
        if (!err) {
          res.status(200).json(data);
        } else {
          console.log(err);
        }
      });
    }
  });
});

app.get("/trains/:id", (req, res) => {
  let id = req.params.id;
  const token = req.get('token');
  connection.query(`SELECT id FROM users WHERE user_token = '${token}';`, (err, data) => {
    if (!err && data.length){
      const user = data[0];
      connection.query(`SELECT * FROM trains WHERE id = ${id} AND user_id = '${user.id}';`, (err, data) => {
        if (!err) {
          res.status(200).json(data);
        } else {
          console.log(err);
        }
      });
    }
  });
});

app.put("/trains", (req, res) => {
  const { id, is_completed, excersises, comment } = req.body;
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
  const { title, date, excersises, is_completed } = req.body;
  const token = req.get('token');
  connection.query(`SELECT id FROM users WHERE user_token = '${token}';`, (err, data) =>{
    if (!err && data.length) {
      const user = data[0];
      let query = `INSERT INTO trains(title, date, excersises, is_completed, user_id ) VALUES ('${title}', '${date}', '${excersises}', '${is_completed}', '${user.id}');`;
      connection.query(query, (err, data) => {
        if (!err) {
          res.status(200).json(data);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.post("/reg", (req, res) => {
  const { user_name, user_surname, user_login, user_password, user_email } = req.body;
  const user_salt = bcrypt.genSaltSync(5);
  const user_hashedpassword = bcrypt.hashSync(user_password, user_salt);

  let query = `INSERT INTO users(user_name, user_surname, user_login, user_email, user_hashedpassword, user_salt) VALUES ('${user_name}', '${user_surname}', '${user_login}', '${user_email}', '${user_hashedpassword}', '${user_salt}');`;
  connection.query(query, (err, data) => {
    if(!err) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  });
});

app.post("/auth", (req, res) => {
  const { user_login, user_password } = req.body;
  let query = `SELECT * FROM users WHERE user_login = '${user_login}';`;
  connection.query(query, (err,data) => {
    if (!err && data.length) {
      const user = data[0];
      const user_hashedpassword = bcrypt.hashSync(user_password, user.user_salt);
      
      if (user.user_hashedpassword === user_hashedpassword) {
        const token = randtoken.generate(15);
        connection.query(`UPDATE users SET user_token = '${token}' WHERE id = '${user.id}';`, (err, data) =>{
          if (!err) {
            res.send(JSON.stringify({token: token }));
          } else {
            res.status(500).send({ err: 'DB error' });
          }
        });
      } else {
        res.status(401).send({ err: 'Unauthorized' });
      }
    } else {
      res.status(401).send({ err: 'Unauthorized1' });
    }
  });
});

app.get("/logout", (req,res) => {
  const token = req.get("token");
  connection.query(`SELECT * FROM users WHERE user_token = "${token}";`, (err, data) => {
    if (!err && data.length) {
      const user = data[0];
      
      connection.query(`UPDATE users SET user_token = NULL WHERE id = "${user.id}";`, (err, data) => {
        if(!err) {
          res.status(201).send();
        } else {
          console.log(err)
        }
      });
    } else {
      res.status(401).send(JSON.stringify({ err: 'Unauthorized request' }));
    }
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});

connection.connect((err) => {
  if (!err) {
    console.log("work!");
  }
});
