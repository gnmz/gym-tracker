const connection = require("../../config/connection");

const postCustomCategories = (req, res) => {
  const { categories_title } = req.body;
  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM custom_excersise_categories WHERE title = '${categories_title}'  AND  user_id = '${user.id}' ;`,
          (err, data) => {
            if (!err && data.length > 0) {
              res
                .status(400)
                .send({ error: "Уже есть такая категория упражнений" });
            } else {
              connection.query(
                `INSERT INTO custom_excersise_categories(title, user_id)VALUES('${categories_title}', '${user.id}'); `,
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

module.exports = postCustomCategories;
