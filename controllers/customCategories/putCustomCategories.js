const connection = require("../../config/connection");

const putCustomCategories = (req, res) => {
  const { id, newTitle, oldTitle } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM custom_excersise_categories WHERE title = '${newTitle}' AND user_id = '${user.id}'; `,
          (err, data) => {
            if (!err && data.length) {
              res
                .status(400)
                .send({ error: `Категория ${newTitle} уже существует` });
            } else {
              connection.query(
                `UPDATE custom_excersise_categories SET title = '${newTitle}' WHERE id = '${id}' AND user_id = '${user.id}' ;`,
                (err, data) => {
                  if (!err) {
                    res.status(200).send({
                      message: `Категория ${oldTitle} успешно переименована в ${newTitle}`,
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

module.exports = putCustomCategories;
