const connection = require("../config/connection");
const bcrypt = require("bcrypt");
const randtoken = require("rand-token");

const auth = (req, res) => {
  const { user_login, user_password } = req.body;
  let query = `SELECT * FROM users WHERE user_login = '${user_login.toLowerCase()}';`;
  connection.query(query, (err, data) => {
    if (!err && data.length) {
      const user = data[0];
      const user_hashedpassword = bcrypt.hashSync(
        user_password,
        user.user_salt
      );

      if (user.user_hashedpassword === user_hashedpassword) {
        const token = randtoken.generate(15);
        connection.query(
          `UPDATE users SET user_token = '${token}' WHERE id = '${user.id}';`,
          (err, data) => {
            if (!err) {
              res.send(JSON.stringify({ token: token }));
            } else {
              res.status(500).send({ err: "DB error" });
            }
          }
        );
      } else {
        res.status(401).send({ err: "Unauthorized" });
      }
    } else {
      res.status(401).send({ err: "Unauthorized1" });
    }
  });
};

module.exports = auth;
