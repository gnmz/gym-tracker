const connection = require("../../config/connection");

const getTrains = (req, res) => {
  let type = req.query.type;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}';`,
    (err, data) => {
      if (!err && data.length && type === "plan") {
        const user = data[0];
        connection.query(
          `SELECT * FROM trains WHERE is_completed = "false" AND user_id = "${user.id}";`,
          (err, data) => {
            if (!err) {
              res.status(200).json(data);
            } else {
              console.log(err);
            }
          }
        );
      } else if (!err && data.length && type === "hist") {
        const user = data[0];
        connection.query(
          `SELECT * FROM trains WHERE is_completed = "true" AND user_id = "${user.id}"; `,
          (err, data) => {
            if (!err) {
              res.status(200).json(data);
            } else {
              console.log(err);
            }
          }
        );
      }
    }
  );
};

module.exports = getTrains;
