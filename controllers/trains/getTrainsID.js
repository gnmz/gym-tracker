const connection = require("../../config/connection");

const getTrainsID = (req, res) => {
  let id = req.params.id;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}';`,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM trains WHERE id = ${id} AND user_id = '${user.id}';`,
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

module.exports = getTrainsID;
