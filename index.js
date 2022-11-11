const express = require("express");
const connection = require("./config/db");
const directoryRouter = require("./routes/directory.route");
const todoRouter = require("./routes/todo.route");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/directory", directoryRouter);
app.use("/todo-item", todoRouter);

app.listen(PORT, async () => {
  try {
    await connection();
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
});
