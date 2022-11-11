const mongooose = require("mongoose");

const directorySchema = mongooose.Schema({
  name: { type: String, required: true, unique: true },
});

const DirectoryModel = mongooose.model("directory", directorySchema);

module.exports = DirectoryModel;
