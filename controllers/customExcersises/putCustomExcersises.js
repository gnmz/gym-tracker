const connection = require("../../config/connection");

const putCustomExcersises = (req, res) => {
  const { id, category_id, oldTitle, newTitle } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM custom_excersises WHERE id = '${id}' AND title = '${newTitle}' AND category_id = '${category_id}' AND user_id = '${user.id}'; `,
          (err, data) => {
            if (!err && data.length) {
              res.status(401).send({ error: "Данное название уже есть" });
            } else {
              connection.query(
                `UPDATE custom_excersises SET title = '${newTitle}' WHERE id = '${id}' AND category_id = '${category_id}'  AND user_id = '${user.id}'; `,
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

module.exports = putCustomExcersises;
