const connection = require("../config/connection");

const getCategories = (req, res) => {
  connection.query("SELECT * FROM excersise_categories;", (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.send(err);
    }
  });
};

module.exports = getCategories;
