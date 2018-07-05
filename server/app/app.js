const express = require("express");
const bodyParser = require("body-parser");
// const multer = require('multer');
const logger = require("morgan");
const cors = require("cors");
const history = require('connect-history-api-fallback');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/chatTest");
} else {
  mongoose.connect("mongodb://localhost/chat");
}

const app = express();

const user = require("./routes/users");
const dialog = require("./routes/dialog");

// 中间件
if (process.env.NODE_ENV !== "test") app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.use(history());
app.use(cors());

//静态文件目录
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/views"));

// 路由
app.use("/user", user);
app.use("/dialog", dialog);

module.exports = app;
