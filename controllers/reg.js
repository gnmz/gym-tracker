const connection = require("../config/connection");
const bcrypt = require("bcrypt");

const reg = (req, res) => {
  const { user_name, user_login, user_password, user_email } = req.body;
  const user_salt = bcrypt.genSaltSync(5);
  const user_hashedpassword = bcrypt.hashSync(user_password, user_salt);
  connection.query(
    `select * from users where user_login = '${user_login}';`,
    (err, data) => {
      if (!err && data.length > 0) {
        res
          .status(401)
          .send({ error: "Пользователь с данным логином уже зарегестрирован" });
      } else {
        connection.query(
          `select * from users where user_email = '${user_email}' ;`,
          (err, data) => {
            if (!err && data.length > 0) {
              res.status(401).send({
                error: "Пользователь с данным email уже зарегестрирован",
              });
            } else {
              let query = `INSERT INTO users(user_name, user_login, user_email, user_hashedpassword, user_salt) VALUES ('${user_name}',  '${user_login}', '${user_email}', '${user_hashedpassword}', '${user_salt}'); `;
              connection.query(query, (err, data) => {
                if (!err) {
                  res
                    .status(200)
                    .send({ message: "Пользователь зарегестрирован!" });
                } else {
                  res.status(400).send({ error: "Ошибка регистрации" });
                }
              });
            }
          }
        );
      }
    }
  );
};

module.exports = reg;
