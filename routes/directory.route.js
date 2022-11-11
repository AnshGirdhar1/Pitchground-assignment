const e = require("express");
const { Router } = require("express");
const DirectoryModel = require("../models/directory.model");
const { deleteMany } = require("../models/todo.model");
const TodoModel = require("../models/todo.model");
const directoryRouter = Router();

directoryRouter.get("/list", async (req, res) => {
  try {
    let data = await DirectoryModel.find();
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something Went Wrong" });
  }
});

directoryRouter.post("/create", async (req, res) => {
  try {
    await DirectoryModel.insertMany([req.body]);
    res.send({ msg: "Directory Created Successfully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Creating Directory Failed" });
  }
});

directoryRouter.delete("/remove", async (req, res) => {
  try {
    await DirectoryModel.deleteMany({});
    res.send({ msg: "All Directories Deleted Successfully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Deleting Directories Failed" });
  }
});

directoryRouter.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DirectoryModel.findByIdAndDelete(id);
    res.send({ msg: "Directory Deleted Succefully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Deleting Directory Failed" });
  }
});

directoryRouter.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  let { page, status } = req.query;
  if (page === undefined) {
    page = 1;
  }
  if (status) {
    try {
      const todoData = await TodoModel.find({ dirId: id, status: status })
        .limit(5)
        .skip((page - 1) * 5);
      res.send(todoData);
    } catch (e) {
      console.log(e);
      res.send({ msg: "Something Went Wrong" });
    }
  } else {
    try {
      const todoData = await TodoModel.find({ dirId: id })
        .limit(5)
        .skip((page - 1) * 5);
      res.send(todoData);
    } catch (e) {
      console.log(e);
      res.send({ msg: "Something Went Wrong" });
    }
  }
});

directoryRouter.delete("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.deleteMany({ dirId: id });
  } catch (e) {
    res.send({ msg: "Deleting Directory Failed" });
  }

  try {
    await DirectoryModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Directory Deleted Successfully" });
  } catch (e) {
    res.send({ msg: "Deleting Directory Failed" });
  }
});

module.exports = directoryRouter;
