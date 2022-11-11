const { Router } = require("express");
const TodoModel = require("../models/todo.model");
const todoRouter = Router();

todoRouter.post("/create", async (req, res) => {
  try {
    await TodoModel.insertMany([req.body]);
    res.send({ msg: "TodoItem Created Succefully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Creating TodoItem Failed" });
  }
});

todoRouter.patch("/mark-as-done/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndUpdate({ _id: id }, { status: "Done" });
    res.send({ msg: "Status Updated As Done" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Updating Status Failed" });
  }
});

todoRouter.patch("/mark-as-not-done/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndUpdate({ _id: id }, { status: "Not Done" });
    res.send({ msg: "Status Updated As Not Done" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Updating Status Failed" });
  }
});

todoRouter.patch("/move-to-directory/:todoId/:dirId", async (req, res) => {
  const { dirId, todoId } = req.params;
  try {
    await TodoModel.findByIdAndUpdate({ _id: todoId }, { dirId });
    res.send("Item Successfully Moved to Directory");
  } catch (e) {
    res.send({ msg: "Moving TodoItem to Directory Failed" });
  }
});

todoRouter.get("/list", async (req, res) => {
  let { page } = req.query;
  if (page === undefined) {
    page = 1;
  }
  try {
    let data = await TodoModel.find()
      .limit(5)
      .skip((page - 1) * 5);
    res.send(data);
  } catch (e) {
    res.send({ msg: "Something Went Wrong" });
  }
});

todoRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.deleteOne({ _id: id });
    res.send({ msg: "TodoItem Deleted Successfully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Deleting TodoItem Failed" });
  }
});

module.exports = todoRouter;
