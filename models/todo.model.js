const mongooose = require("mongoose");

const todoSchema = mongooose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  dirId: { type: String },
});

const TodoModel = mongooose.model("todo", todoSchema);

module.exports = TodoModel;
