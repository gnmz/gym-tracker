const getCustomCategories = require("./customCategories/getCustomCategories");
const getCustomCategoriesAll = require("./customCategories/getCustomCategoriesAll");
const postCustomCategories = require("./customCategories/postCustomCategories");
const putCustomCategories = require("./customCategories/putCustomCategories");
const deleteCustomCategories = require("./customCategories/deleteCustomCategories");

const customCategories = {
  getCustomCategories: getCustomCategories,
  getCustomCategoriesAll: getCustomCategoriesAll,
  postCustomCategories: postCustomCategories,
  putCustomCategories: putCustomCategories,
  deleteCustomCategories: deleteCustomCategories,
};

module.exports = customCategories;
