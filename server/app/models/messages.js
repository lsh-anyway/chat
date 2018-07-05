const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  dialog: {
    type: ObjectId,
    ref: "dialog",
    required: true
  },
  from: {
    type: ObjectId,
    ref: "user",
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
    },
    status: {
      receive: [{
        type: ObjectId,
        ref: "user"
      }],
      read: [{
        type: ObjectId,
        ref: "user"
      }]
    }
  }
});

MessageSchema.pre("save", async function(next) {
  this.meta.createAt = Date.now();
  next();
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
