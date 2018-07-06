const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DialogSchema = new Schema({
  members: [{
    type: ObjectId,
    ref: "user",
    required: true
  }],
  messages: [{
    type: ObjectId,
    ref: "message"
  }]
});

const Dialog = mongoose.model("dialog", DialogSchema);

module.exports = Dialog;
