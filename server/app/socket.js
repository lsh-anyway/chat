const app = require("./app");
const http = require("http");
const server = http.Server(app);
const User = require("./models/users");
const Dialog = require("./models/dialogs");
const Message = require("./models/messages");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const _ = require("lodash");

const io = require("socket.io")(server, {
  origins: ["http://127.0.0.1:8080", "http://localhost:8080"],
  serveClient: false
});

io.on("connection", socket => {
  socket.emit("news", "connecting...");
  socket.on("init", data => {
    socket.user_id = data.user_id;
  });
  socket.on("verify", async data => {
    const sockets = io.sockets.sockets;
    const to = data.to;
    const content = data.content;
    const user_id = socket.user_id;
    const from = await User.findById(user_id);
    const user = await User.findById(to);
    let toSocket = _.filter(sockets, _.matches({ user_id: to }))[0];
    user.verifications.push({
      from,
      content
    });
    await user.save();
    let fromInfo = {
      _id: from._id,
      avatar: from.avatar,
      nickname: from.nickname
    };
    if (toSocket) {
      toSocket.emit("verify", {
        from: fromInfo,
        content
      });
    }
  });
  socket.on("agree", async data => {
    const sockets = io.sockets.sockets;
    const id = data.from._id;
    let toSocket = _.filter(sockets, _.matches({ user_id: id }))[0];
    let to = await User.findById(id).populate("verifications.from");
    let from = await User.findById(socket.user_id).populate(
      "verifications.from"
    );

    await to.update({ $addToSet: { friends: from } });
    await from.update({ $addToSet: { friends: to } });

    from.verifications = from.verifications.filter(item => {
      return item.from._id.toString() !== id.toString();
    });

    await from.save();

    if (toSocket) {
      toSocket.emit("agree", {
        _id: from._id,
        avatar: from.avatar,
        nickname: from.nickname
      });
    }
  });
  socket.on("message", async data => {
    const sockets = io.sockets.sockets;
    let dialog = await Dialog.findById(data.dialog);
    let from = await User.findById(data.from);
    let content = data.content;
    let message = new Message({
      dialog,
      from,
      content
    });

    await dialog.update({ $addToSet: { messages: message } });
    await message.save();

    let members = dialog.members;
    let response = {
      meta: message.meta,
      dialog: data.dialog,
      content: data.content,
      from: {
        _id: from._id,
        avatar: from.avatar,
        nickname: from.nickname
      }
    };

    members.forEach(async member => {
      let id = member.toString();
      let memberSocket =  _.filter(sockets, _.matches({ user_id: id }))[0];
      if (memberSocket) {
        await message.update({$addToSet: {"meta.status.receive": member}});
        memberSocket.emit("message", response);
      }
    });
  });
  socket.on("read", async data => {
    let id = socket.user_id;
    let user = await User.findById(id);
    let dialog = await Dialog.findById(data).populate({
      path: "messages",
      match: {"meta.status.read": {$ne: new ObjectId(id)}}
    });
    dialog.messages.forEach(async messageInfo => {
      let message = Message.findById(messageInfo._id);
      if (user) {
        await message.update({$addToSet: {"meta.status.read": user}});
      }
    });
  })
});

module.exports = server;
