const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DialogSchema = new Schema({
  member: [{
    type: ObjectId,
    ref: "User",
    required: true
  }],
  message: [{
    type: ObjectId,
    ref: "Message"
  }]
});

const Dialog = mongoose.model("dialog", DialogSchema);

module.exports = Dialog;
