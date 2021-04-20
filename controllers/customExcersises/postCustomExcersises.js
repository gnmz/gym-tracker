const connection = require("../../config/connection");

const postCustomExcersises = (req, res) => {
  const {
    CreateExcersiseTitle,
    CreateExcersiseId,
    exerciseDescription,
    CreateCategoryTitle,
  } = req.body;

  const token = req.get("token");
  connection.query(
    `SELECT id FROM users WHERE user_token = '${token}'; `,
    (err, data) => {
      if (!err && data.length) {
        const user = data[0];
        connection.query(
          `SELECT * FROM custom_excersises WHERE title = '${CreateExcersiseTitle}' AND category_id = '${CreateExcersiseId}' AND user_id = '${user.id}'; `,
          (err, data) => {
            if (!err && data.length > 0) {
              res.status(401).send({
                error: `Уже есть такое упражнение в категории ${CreateCategoryTitle}`,
              });
            } else {
              if (exerciseDescription.length <= 0) {
                connection.query(
                  `INSERT INTO custom_excersises(category_id, title, user_id)VALUES('${CreateExcersiseId}', '${CreateExcersiseTitle}', '${user.id}'); `,
                  (err, data) => {
                    if (!err) {
                      res.status(200).send({
                        message: `Упражнение ${CreateExcersiseTitle} успешно добавлено в категорию ${CreateCategoryTitle}`,
                      });
                    }
                  }
                );
              } else {
                connection.query(
                  `INSERT INTO custom_excersises(category_id, title, user_id, description)VALUES('${CreateExcersiseId}', '${CreateExcersiseTitle}', '${user.id}', '${exerciseDescription}'); `,
                  (err, data) => {
                    if (!err) {
                      res.status(200).send({
                        message: `Упражнение ${CreateExcersiseTitle} с описанием успешно добавлено в категорию ${CreateCategoryTitle}`,
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};

module.exports = postCustomExcersises;
