const express = require("express");
const app = express();
require("dotenv").config();

const route = require("./routes");

//conect to mongosedb
const mongoose = require("mongoose");
const { task, taskSchema } = require("./models/taskSchema");
mongoose
  .connect("mongodb://127.0.0.1:27017/todoX")
  .then((e) => {
    console.log("conect success: ");
  })
  .catch((e) => {
    console.log("err: ", e);
  });

const cors = require("cors")
app.use(cors())
app.use(express.json())


route(app);

app.listen(3000, () => console.log("http://localhost:3000"));
