const connection = require("../../config/connection");

const putTrains = (req, res) => {
  const { id, is_completed, excersises, comment } = req.body;
  let query = `UPDATE trains SET excersises = '${excersises}', is_completed = '${is_completed}', comment = '${comment}' WHERE ( id = '${id}');`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
};

module.exports = putTrains;
