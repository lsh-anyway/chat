const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
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
const server = http.Server(app);
const io = require("socket.io")(server, {
  origins: ["http://127.0.0.1:8080", "http://localhost:8080"],
  serveClient: false
});

const user = require("./routes/users");

const corsOptions = {
  origin: "http://localhost:8080"
};

// 中间件
if (process.env.NODE_ENV !== "test") app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//静态文件目录
app.use("/assets", express.static(__dirname + "/assets"));

// 路由
app.use("/user", user);

io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});

module.exports = server;
