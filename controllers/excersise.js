const connection = require("../config/connection");

const getExcersises = (req, res) => {
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
};

module.exports = getExcersises;
