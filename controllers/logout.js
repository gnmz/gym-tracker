const connection = require("../config/connection");

const logout = (req, res) => {
  const token = req.get("token");
  connection.query(
    `SELECT * FROM users WHERE user_token = "${token}";`,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];

        connection.query(
          `UPDATE users SET user_token = NULL WHERE id = "${user.id}";`,
          (err, data) => {
            if (!err) {
              res.status(201).send();
            } else {
              console.log(err);
            }
          }
        );
      } else {
        res.status(401).send(JSON.stringify({ err: "Unauthorized request" }));
      }
    }
  );
};

module.exports = logout;
