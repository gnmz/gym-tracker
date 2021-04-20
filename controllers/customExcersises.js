const getCustomExcersises = require("./customExcersises/getCustomExcersises");
const putCustomExcersises = require("./customExcersises/putCustomExcersises");
const postCustomExcersises = require("./customExcersises/postCustomExcersises");
const deleteCustomExcersises = require("./customExcersises/deleteCustomExcersises");

const customExcersises = {
  getCustomExcersises: getCustomExcersises,
  putCustomExcersises: putCustomExcersises,
  postCustomExcersises: postCustomExcersises,
  deleteCustomExcersises: deleteCustomExcersises,
};

module.exports = customExcersises;
