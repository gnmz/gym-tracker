const connection = require("../../config/connection");

const getCustomCategories = (req, res) => {
  const token = req.get("token");
  connection.query(
    `SELECT id from users where user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM custom_excersise_categories WHERE user_id = '${user.id}'; `,
          (err, data) => {
            if (!err) {
              res.status(200).json(data);
            }
          }
        );
      }
    }
  );
};

module.exports = getCustomCategories;
