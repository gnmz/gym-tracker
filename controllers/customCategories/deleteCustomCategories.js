const connection = require("../../config/connection");

const deleteCustomCategories = (req, res) => {
  const { id, title } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `DELETE FROM custom_excersise_categories WHERE id = '${id}' AND title = '${title}' AND user_id = '${user.id}'; `,
          (err, data) => {
            if (!err) {
              connection.query(
                `DELETE FROM custom_excersises WHERE category_id = '${id}' AND user_id = '${user.id}'; `,
                (err, data) => {
                  if (!err) {
                    res.status(200).send({
                      message: `Категория ${title} и ее упражнения успешно удалены`,
                    });
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

module.exports = deleteCustomCategories;
