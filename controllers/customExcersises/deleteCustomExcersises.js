const connection = require("../../config/connection");

const deleteCustomExcersises = (req, res) => {
  const { id, category_id, title } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT * FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `DELETE FROM custom_excersises WHERE id = '${id}' AND category_id = '${category_id}' AND title = '${title}' AND user_id = '${user.id}'; `,
          (err, data) => {
            if (!err) {
              res.status(200).send({
                message: `Упражнение ${title} успешно удалены`,
              });
            } else {
              console.log(err);
            }
          }
        );
      }
    }
  );
};

module.exports = deleteCustomExcersises;
