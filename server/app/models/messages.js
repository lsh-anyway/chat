const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  dialog: {
    type: ObjectId,
    ref: "Dialog",
    required: true
  },
  from: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
