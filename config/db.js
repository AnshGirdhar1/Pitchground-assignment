const mongooose = require("mongoose");

const connection = () => {
  return mongooose.connect(process.env.MONGO_URL);
};

module.exports = connection;
