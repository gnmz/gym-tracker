const getTrains = require("./trains/getTrains");
const getTrainsID = require("./trains/getTrainsID");
const postTrains = require("./trains/postTrains");
const putTrains = require("./trains/putTrains");

const trains = {
  getTrains: getTrains,
  getTrainsID: getTrainsID,
  postTrains: postTrains,
  putTrains: putTrains,
};

module.exports = trains;
