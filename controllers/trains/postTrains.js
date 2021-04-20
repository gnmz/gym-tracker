const connection = require("../../config/connection");

const postTrains = (req, res) => {
  const { title, date, excersises, is_completed } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}';`,
    (err, data) => {
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
    }
  );
};

module.exports = postTrains;
