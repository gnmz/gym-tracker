const connection = require("../../config/connection");

const getCustomExcersises = (req, res) => {
  const categoryId = req.query.categoryId;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}';`,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `select custom_excersises.id, custom_excersises.title, custom_excersises.description FROM custom_excersises JOIN custom_excersise_categories ON custom_excersises.category_id  = custom_excersise_categories.id WHERE custom_excersises.category_id = ${categoryId} AND custom_excersises.user_id = '${user.id}'; `,
          (err, data) => {
            if (!err) {
              res.status(200).json(data);
            } else {
              connection.query(
                `SELECT * FROM custom_excersises WHERE user_id = '${user.id}';`,
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
      }
    }
  );
};

module.exports = getCustomExcersises;
