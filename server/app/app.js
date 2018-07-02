const express = require("express");
const bodyParser = require("body-parser");
// const multer = require('multer');
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/chatTest");
} else {
  mongoose.connect("mongodb://localhost/chat");
}

const app = express();

const user = require("./routes/users");

const corsOptions = {
  origin: "http://localhost:8080"
};

// 中间件
if (process.env.NODE_ENV !== "test") app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.use(cors(corsOptions));

//静态文件目录
app.use("/assets", express.static(__dirname + "/assets"));

// 路由
app.use("/user", user);

module.exports = app;
