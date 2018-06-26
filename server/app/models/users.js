const mongoose = require("mongoose");
const bcryto = require("bcryptjs");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  method: {
    type: String,
    enum: ["local"],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  friends: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  // 0: normal user
  // 50: admin
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 将用户信息保存进数据库之前，现将密码加密
UserSchema.pre("save", async function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  if (this.method === "local") {
    try {
      // 生成盐
      const salt = await bcryto.genSalt(10);
      // 生成哈希密码替换掉未加密的密码
      this.local.password = await bcryto.hash(this.local.password, salt);
      next();
    } catch (e) {
      next(e);
    }
  }
});

UserSchema.method("validPassword", async function(newPassword) {
  try {
    return bcryto.compare(newPassword, this.local.password);
  } catch (e) {
    throw new Error(e);
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
