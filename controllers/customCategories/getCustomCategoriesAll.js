const connection = require("../../config/connection");

const getCustomCategoriesAll = (req, res) => {
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}' ;`,
    (err, data) => {
      if (!err && data.length > 0) {
        const user = data[0];
        connection.query(
          `select custom_excersises.id, custom_excersises.title, custom_excersises.description, custom_excersise_categories.title AS category_title, custom_excersise_categories.id AS category_id FROM custom_excersises
        JOIN custom_excersise_categories ON custom_excersises.category_id  = custom_excersise_categories.id WHERE custom_excersises.user_id = '${user.id}'; `,
          (err, data) => {
            if (!err) {
              res.status(200).json(data);
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = getCustomCategoriesAll;
